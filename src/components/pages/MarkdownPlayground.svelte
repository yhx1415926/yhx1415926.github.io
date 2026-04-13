<script lang="ts">
import { toHtml } from "@expressive-code/core/hast";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { ExpressiveCodeEngine, pluginShiki } from "astro-expressive-code";
import { pluginCollapsible } from "expressive-code-collapsible";
import { pluginLanguageBadge } from "expressive-code-language-badge";
import { onMount, tick } from "svelte";
import { unified } from "../../../node_modules/.pnpm/unified@11.0.5/node_modules/unified/index.js";
import remarkParse from "../../../node_modules/.pnpm/remark-parse@11.0.0/node_modules/remark-parse/index.js";
import remarkMdx from "../../../node_modules/.pnpm/remark-mdx@3.1.1/node_modules/remark-mdx/index.js";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import remarkSectionize from "remark-sectionize";
import remarkRehype from "../../../node_modules/.pnpm/remark-rehype@11.1.2/node_modules/remark-rehype/index.js";
import rehypeRaw from "../../../node_modules/.pnpm/rehype-raw@7.0.0/node_modules/rehype-raw/index.js";
import rehypeStringify from "../../../node_modules/.pnpm/rehype-stringify@10.0.1/node_modules/rehype-stringify/index.js";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components";
import matter from "gray-matter";
import "katex/dist/katex.min.css";
import { siteConfig } from "@/config";
import { parseDirectiveNode } from "@/plugins/remark-directive-rehype";
import { remarkMermaid } from "@/plugins/remark-mermaid";
import { rehypeMermaid } from "@/plugins/rehype-mermaid";
import rehypeFigure from "@/plugins/rehype-figure.mjs";
import rehypeEmailProtection from "@/plugins/rehype-email-protection.mjs";
import { GithubCardComponent } from "@/plugins/rehype-component-github-card.mjs";

const demoMarkdown = `---
title: Markdown 渲染测试
---

# 在线 Markdown 预览器

支持 KaTeX、Mermaid、HTML、脚本执行与 GitHub 仓库名片。

## 代码高亮

\`\`\`ts
const add = (a: number, b: number) => a + b;
console.log(add(1, 2));
\`\`\`

> [!TIP] TIP
> 这是提示内容，和博客文章的 callout 样式一致。

> [!WARNING] WARNING
> 这是警告内容，可用于强调风险。

## HTML + JS

<div id="js-demo" style="padding:8px;border:1px dashed #999;border-radius:8px;">等待脚本执行...</div>
<script>
  const el = document.getElementById('js-demo');
  if (el) el.textContent = '脚本已执行 ✅';
<${"/"}script>

## GitHub 仓库名片

::github{repo="microsoft/TypeScript"}

## Mermaid

\`\`\`mermaid
graph TD
A[编辑 Markdown] --> B[点击渲染]
B --> C[统一渲染链路]
\`\`\`
`;

let markdownText = demoMarkdown;
let renderedHtml = "";
let uploadError = "";
let expressiveCodeEngine: ExpressiveCodeEngine | null = null;
let expressiveCodeStylesInjected = false;
let enableKatex = true;
let enableMermaid = true;
let isRendering = false;
let fileInput: HTMLInputElement | null = null;
let previewContainer: HTMLDivElement | null = null;

const loadHighlight = async () => {
	if (expressiveCodeEngine) {
		return expressiveCodeEngine;
	}

	expressiveCodeEngine = new ExpressiveCodeEngine({
		plugins: [
			pluginShiki(),
			pluginLanguageBadge(),
			pluginCollapsibleSections(),
			pluginLineNumbers(),
			pluginCollapsible(),
		],
	});

	return expressiveCodeEngine;
};

const ensureExpressiveCodeStyles = async (engine: ExpressiveCodeEngine) => {
	if (expressiveCodeStylesInjected || typeof document === "undefined") {
		return;
	}

	const baseStyles = await engine.getBaseStyles();
	const themeStyles = await engine.getThemeStyles();
	const styleTag = document.createElement("style");
	styleTag.id = "markdown-playground-ec-styles";
	styleTag.textContent = `${baseStyles}\n${themeStyles}`;
	document.head.appendChild(styleTag);
	expressiveCodeStylesInjected = true;
};

const runScripts = async () => {
	if (!previewContainer) {
		return;
	}
	const scripts = Array.from(previewContainer.querySelectorAll("script"));
	for (const oldScript of scripts) {
		const newScript = document.createElement("script");
		for (const attr of oldScript.attributes) {
			newScript.setAttribute(attr.name, attr.value);
		}
		newScript.textContent = oldScript.textContent;
		oldScript.replaceWith(newScript);
	}
};

const renderWithBlogPipeline = async (input: string) => {
	const strippedContent = matter(input).content;
	const remarkPlugins: any[] = [
		remarkParse,
		remarkMdx,
		remarkMath,
		remarkDirective,
		remarkSectionize,
		parseDirectiveNode,
	];
	if (enableMermaid) {
		remarkPlugins.push(remarkMermaid);
	}

	const rehypePlugins: any[] = [];
	if (enableKatex) {
		rehypePlugins.push(rehypeKatex);
	}
	rehypePlugins.push(
		[rehypeCallouts, { theme: siteConfig.rehypeCallouts.theme }],
		rehypeSlug,
	);
	if (enableMermaid) {
		rehypePlugins.push(rehypeMermaid);
	}
	rehypePlugins.push(
		rehypeFigure,
		[rehypeEmailProtection, { method: "base64" }],
		[
			rehypeComponents,
			{
				components: {
					github: GithubCardComponent,
				},
			},
		],
		[
			rehypeAutolinkHeadings,
			{
				behavior: "append",
				properties: {
					className: ["anchor"],
				},
				content: {
					type: "element",
					tagName: "span",
					properties: {
						className: ["anchor-icon"],
						"data-pagefind-ignore": true,
					},
					children: [{ type: "text", value: "#" }],
				},
			},
		],
	);

	const file = await unified()
		.use(remarkPlugins)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypePlugins)
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(strippedContent);

	return String(file);
};

const renderCodeHighlight = async () => {
	try {
		if (!previewContainer) {
			return;
		}

		const engine = await loadHighlight();
		if (!engine) {
			return;
		}
		await ensureExpressiveCodeStyles(engine);

		const blocks = Array.from(previewContainer.querySelectorAll("pre > code"));
		for (const codeElement of blocks) {
			const preElement = codeElement.parentElement;
			if (!preElement) continue;
			const className = codeElement.className || "";
			const language =
				className.match(/language-([a-z0-9+-]+)/i)?.[1] ?? "text";
			const renderResult = await engine.render({
				code: codeElement.textContent ?? "",
				language,
				meta: "",
			});
			preElement.outerHTML = toHtml(renderResult.renderedGroupAst);
		}
	} catch (error) {
		console.warn("代码高亮渲染失败", error);
	}
};

const renderMarkdown = async () => {
	if (isRendering) {
		return;
	}
	isRendering = true;
	uploadError = "";
	try {
		renderedHtml = await renderWithBlogPipeline(markdownText);
		await tick();
		await runScripts();
		await renderCodeHighlight();
	} finally {
		isRendering = false;
	}
};

const triggerFilePicker = () => {
	fileInput?.click();
};

const handleFileChange = async (event: Event) => {
	uploadError = "";
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];

	if (!file) {
		return;
	}

	if (!/\.(md|mdx)$/i.test(file.name)) {
		uploadError = "请上传 .md 或 .mdx 文件";
		input.value = "";
		return;
	}

	markdownText = await file.text();
	input.value = "";
};

onMount(() => {
	renderMarkdown();
});
</script>

<div class="card-base rounded-(--radius-large) overflow-hidden">
	<div class="border-b border-black/8 dark:border-white/8 px-4 py-3 flex flex-wrap items-center gap-4 justify-between">
		<div>
			<h1 class="text-xl font-semibold text-90">Markdown / MDX 渲染器</h1>
			<p class="text-sm text-50 mt-1">点击“渲染”后更新结果，输出直接作为正文展示。</p>
		</div>

		<div class="flex flex-wrap items-center gap-4 text-sm">
			<button type="button" class="control-btn import-btn" on:click={triggerFilePicker}>导入文件</button>
			<input bind:this={fileInput} type="file" accept=".md,.mdx,text/markdown,text/plain" on:change={handleFileChange} class="sr-only" />

			<label class="toggle-item control-btn">
				<span>KaTeX</span>
				<input type="checkbox" bind:checked={enableKatex}>
			</label>

			<label class="toggle-item control-btn">
				<span>Mermaid</span>
				<input type="checkbox" bind:checked={enableMermaid}>
			</label>

			<button type="button" class="render-btn control-btn" on:click={renderMarkdown} disabled={isRendering}>
				{isRendering ? "渲染中..." : "渲染"}
			</button>
		</div>
	</div>

	<section class="pane">
		<div class="pane-title">Markdown 输入</div>
		<textarea
			bind:value={markdownText}
			spellcheck="false"
			class="editor"
			placeholder="在这里粘贴 posts 中的 .md/.mdx 内容..."
		></textarea>
	</section>

	{#if uploadError}
		<div class="px-4 py-3 text-sm text-red-500 border-t border-black/8 dark:border-white/8">{uploadError}</div>
	{/if}
</div>

<hr class="preview-divider" />

<div bind:this={previewContainer} class="md-preview prose dark:prose-invert max-w-none custom-md">
	{@html renderedHtml}
</div>

<style>
	:global(.katex-display) {
		overflow-x: auto;
		overflow-y: hidden;
		padding: 0.2rem 0;
	}

	.pane {
		display: flex;
		flex-direction: column;
	}

	.pane-title {
		font-size: 0.85rem;
		color: rgb(0 0 0 / 0.55);
		padding: 0.75rem 1rem;
		border-bottom: 1px solid rgb(0 0 0 / 0.08);
	}

	:global(.dark) .pane-title {
		color: rgb(255 255 255 / 0.6);
		border-bottom-color: rgb(255 255 255 / 0.08);
	}

	.editor {
		width: 100%;
		min-height: 22rem;
		padding: 1rem;
		resize: vertical;
		outline: none;
		font-size: 0.92rem;
		line-height: 1.7;
		font-family: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		background: transparent;
	}

	.md-preview {
		padding: 0.2rem 0 2rem;
	}

	.preview-divider {
		margin: 1.25rem 0;
		border-top: 1px dashed var(--line-divider);
	}

	.import-btn {
		padding: 0.3rem 0.65rem;
		border-radius: 0.5rem;
		color: rgb(0 0 0 / 0.72);
		transition: all 0.18s ease;
	}

	.import-btn:hover {
		background: var(--btn-regular-bg-hover);
		color: var(--primary);
	}

	:global(.dark) .import-btn {
		color: rgb(255 255 255 / 0.72);
	}

	:global(.dark) .import-btn:hover {
		text-shadow: 0 0 10px rgb(255 255 255 / 0.24);
	}

	.toggle-item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: rgb(0 0 0 / 0.72);
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		transition: background 0.18s ease;
	}

	.toggle-item:hover {
		background: var(--btn-regular-bg-hover);
	}

	.toggle-item input {
		cursor: pointer;
	}

	:global(.dark) .toggle-item {
		color: rgb(255 255 255 / 0.72);
	}

	.render-btn {
		padding: 0.35rem 0.85rem;
		border-radius: 0.5rem;
		background: var(--primary);
		color: #fff;
		font-weight: 600;
		transition: all 0.18s ease;
	}

	.render-btn:hover {
		opacity: 0.88;
	}

	.control-btn {
		cursor: pointer;
	}

	.control-btn:active {
		transform: translateY(1px);
		box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.2);
	}

	.render-btn:disabled {
		cursor: not-allowed;
		opacity: 0.55;
		box-shadow: none;
		transform: none;
	}

	:global(.md-preview pre) {
		background: var(--codeblock-bg);
		border-radius: 0.85rem;
		padding: 1rem 1.1rem;
		overflow-x: auto;
	}

	:global(.md-preview pre code) {
		background: transparent;
		color: inherit;
		padding: 0;
		border-radius: 0;
		display: block;
	}
</style>
