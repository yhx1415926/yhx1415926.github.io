<script lang="ts">
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";
import { onMount } from "svelte";

const demoMarkdown = `---
title: Markdown 渲染测试
---

# 在线 Markdown 预览器

支持 KaTeX、Mermaid 与普通 Markdown。

## 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

## Mermaid

\`\`\`mermaid
graph TD
A[编辑 Markdown] --> B[实时渲染]
B --> C[省去本地反复构建]
\`\`\`
`;

let markdownText = demoMarkdown;
let renderedHtml = "";
let uploadError = "";
let mermaidApi: any = null;
let renderTimer: ReturnType<typeof setTimeout> | undefined;
let activeTab: "editor" | "preview" = "editor";

const FENCED_CODE_TOKEN = "@@FENCED_CODE_";
const INLINE_CODE_TOKEN = "@@INLINE_CODE_";
const MATH_TOKEN = "@@MATH_";

const preprocessMarkdown = (input: string) => {
	let md = input.replace(/^---\n[\s\S]*?\n---\n?/m, "");
	const fencedCodes: string[] = [];
	const inlineCodes: string[] = [];
	const mathFragments: string[] = [];

	md = md.replace(/```[\s\S]*?```/g, (block) => {
		const index = fencedCodes.push(block) - 1;
		return `${FENCED_CODE_TOKEN}${index}@@`;
	});

	md = md.replace(/`[^`\n]+`/g, (inlineCode) => {
		const index = inlineCodes.push(inlineCode) - 1;
		return `${INLINE_CODE_TOKEN}${index}@@`;
	});

	md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, formula: string) => {
		try {
			const html = katex.renderToString(formula.trim(), {
				throwOnError: false,
				displayMode: true,
			});
			const index = mathFragments.push(html) - 1;
			return `${MATH_TOKEN}${index}@@`;
		} catch {
			return `$$${formula}$$`;
		}
	});

	md = md.replace(/(^|[^\\])\$(.+?)\$/g, (match, prefix: string, formula: string) => {
		if (!formula.trim() || formula.includes("\n")) {
			return match;
		}
		try {
			const html = katex.renderToString(formula.trim(), {
				throwOnError: false,
				displayMode: false,
			});
			const index = mathFragments.push(html) - 1;
			return `${prefix}${MATH_TOKEN}${index}@@`;
		} catch {
			return match;
		}
	});

	md = md.replace(new RegExp(`${INLINE_CODE_TOKEN}(\\d+)@@`, "g"), (_, i) => inlineCodes[Number(i)]);
	md = md.replace(new RegExp(`${FENCED_CODE_TOKEN}(\\d+)@@`, "g"), (_, i) => fencedCodes[Number(i)]);

	return {
		md,
		mathFragments,
	};
};

const transformMermaidBlocks = (html: string) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const blocks = doc.querySelectorAll("pre > code.language-mermaid");

	for (const block of blocks) {
		const pre = block.parentElement;
		const container = doc.createElement("div");
		container.className = "mermaid";
		container.setAttribute("data-mermaid-code", block.textContent ?? "");
		container.textContent = block.textContent ?? "";
		pre?.replaceWith(container);
	}

	return doc.body.innerHTML;
};

const renderMarkdown = async () => {
	const { md, mathFragments } = preprocessMarkdown(markdownText);
	const rawHtml = marked.parse(md, {
		gfm: true,
		breaks: true,
	}) as string;

	let html = transformMermaidBlocks(rawHtml);
	html = html.replace(new RegExp(`${MATH_TOKEN}(\\d+)@@`, "g"), (_, i) => mathFragments[Number(i)] || "");
	renderedHtml = html;

	await renderMermaid();
};

const scheduleRender = () => {
	clearTimeout(renderTimer);
	renderTimer = setTimeout(() => {
		renderMarkdown();
	}, 120);
};

const loadMermaid = async () => {
	if (typeof window === "undefined") {
		return null;
	}

	if ((window as any).mermaid) {
		return (window as any).mermaid;
	}

	await new Promise<void>((resolve, reject) => {
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Mermaid 加载失败"));
		document.head.appendChild(script);
	});

	return (window as any).mermaid ?? null;
};

const renderMermaid = async () => {
	try {
		if (!mermaidApi) {
			mermaidApi = await loadMermaid();
		}
		if (!mermaidApi) {
			return;
		}

		const isDark = document.documentElement.classList.contains("dark");
		mermaidApi.initialize({
			startOnLoad: false,
			securityLevel: "loose",
			theme: isDark ? "dark" : "default",
		});

		const blocks = document.querySelectorAll<HTMLDivElement>(".md-preview .mermaid[data-mermaid-code]");
		await Promise.all(
			Array.from(blocks).map(async (el, index) => {
				const code = el.dataset.mermaidCode ?? "";
				const { svg } = await mermaidApi.render(`preview-mermaid-${Date.now()}-${index}`, code);
				el.innerHTML = svg;
			}),
		);
	} catch (error) {
		console.warn("Mermaid 渲染失败", error);
	}
};

const handleFileChange = async (event: Event) => {
	uploadError = "";
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];

	if (!file) {
		return;
	}

	const isMarkdownFile = /\.(md|mdx)$/i.test(file.name);
	if (!isMarkdownFile) {
		uploadError = "请上传 .md 或 .mdx 文件";
		input.value = "";
		return;
	}

	markdownText = await file.text();
	input.value = "";
	scheduleRender();
};

onMount(() => {
	renderMarkdown();
});
</script>

<div class="card-base rounded-(--radius-large) overflow-hidden">
	<div class="border-b border-black/8 dark:border-white/8 px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
		<div>
			<h1 class="text-xl font-semibold text-90">Markdown / MDX 在线渲染器</h1>
			<p class="text-sm text-50 mt-1">上方编辑，下方实时预览。支持 KaTeX 与 Mermaid。</p>
		</div>
		<div class="flex items-center gap-2">
			<label class="text-sm text-60">导入文件</label>
			<input type="file" accept=".md,.mdx,text/markdown,text/plain" on:change={handleFileChange} class="text-xs max-w-52" />
		</div>
	</div>

	<div class="lg:hidden flex border-b border-black/8 dark:border-white/8">
		<button class="tab-btn" class:active={activeTab === "editor"} on:click={() => (activeTab = "editor")}>编辑</button>
		<button class="tab-btn" class:active={activeTab === "preview"} on:click={() => (activeTab = "preview")}>预览</button>
	</div>

	<div class="editor-preview-stack">
		<section class="pane" class:hidden={activeTab === "preview"}>
			<div class="pane-title">Markdown 输入</div>
			<textarea
				bind:value={markdownText}
				on:input={scheduleRender}
				spellcheck="false"
				class="editor"
				placeholder="在这里粘贴 posts 中的 .md/.mdx 内容..."
			></textarea>
		</section>

		<section class="pane" class:hidden={activeTab === "editor"}>
			<div class="pane-title">渲染结果</div>
			<div class="md-preview prose dark:prose-invert max-w-none" >
				{@html renderedHtml}
			</div>
		</section>
	</div>

	{#if uploadError}
		<div class="px-4 py-3 text-sm text-red-500 border-t border-black/8 dark:border-white/8">{uploadError}</div>
	{/if}
</div>

<style>
	:global(.katex-display) {
		overflow-x: auto;
		overflow-y: hidden;
		padding: 0.2rem 0;
	}

	.editor-preview-stack {
		display: grid;
		grid-template-rows: minmax(18rem, 48vh) minmax(18rem, 48vh);
	}

	.pane {
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.pane + .pane {
		border-top: 1px solid rgb(0 0 0 / 0.08);
	}

	:global(.dark) .pane + .pane {
		border-top-color: rgb(255 255 255 / 0.08);
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
		flex: 1;
		padding: 1rem;
		resize: none;
		outline: none;
		font-size: 0.92rem;
		line-height: 1.7;
		font-family: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		background: transparent;
	}

	.md-preview {
		flex: 1;
		overflow: auto;
		padding: 1rem 1.2rem 2rem;
	}

	.tab-btn {
		flex: 1;
		padding: 0.6rem 0.8rem;
		font-size: 0.9rem;
		color: rgb(0 0 0 / 0.58);
	}

	:global(.dark) .tab-btn {
		color: rgb(255 255 255 / 0.58);
	}

	.tab-btn.active {
		color: var(--primary);
		font-weight: 600;
		border-bottom: 2px solid var(--primary);
	}

	@media (min-width: 1024px) {
		.editor-preview-stack {
			grid-template-rows: minmax(22rem, 44vh) minmax(22rem, 44vh);
		}

		.pane.hidden {
			display: flex !important;
		}
	}

	@media (max-width: 1023px) {
		.pane.hidden {
			display: none;
		}
	}
</style>
