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
\\int_0^1 x^2 dx = \\frac{1}{3}
$$

## Mermaid

\`\`\`mermaid
graph TD
A[编辑 Markdown] --> B[点击渲染]
B --> C[降低实时渲染卡顿]
\`\`\`
`;

let markdownText = demoMarkdown;
let renderedHtml = "";
let uploadError = "";
let mermaidApi: any = null;
let enableKatex = true;
let enableMermaid = false;
let fileInput: HTMLInputElement | null = null;

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

	if (enableKatex) {
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
	}

	md = md.replace(new RegExp(`${INLINE_CODE_TOKEN}(\\d+)@@`, "g"), (_, i) => inlineCodes[Number(i)]);
	md = md.replace(new RegExp(`${FENCED_CODE_TOKEN}(\\d+)@@`, "g"), (_, i) => fencedCodes[Number(i)]);

	return {
		md,
		mathFragments,
	};
};

const transformMermaidBlocks = (html: string) => {
	if (!enableMermaid) {
		return html;
	}

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
	if (!enableMermaid) {
		return;
	}

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

const renderMarkdown = async () => {
	uploadError = "";
	const { md, mathFragments } = preprocessMarkdown(markdownText);
	const rawHtml = marked.parse(md, {
		gfm: true,
		breaks: true,
	}) as string;

	let html = transformMermaidBlocks(rawHtml);
	if (enableKatex) {
		html = html.replace(new RegExp(`${MATH_TOKEN}(\\d+)@@`, "g"), (_, i) => mathFragments[Number(i)] || "");
	}

	renderedHtml = html;
	await renderMermaid();
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
			<p class="text-sm text-50 mt-1">点击“渲染”后更新结果，减少页面卡顿。</p>
		</div>

		<div class="flex flex-wrap items-center gap-4 text-sm">
			<button type="button" class="import-btn" on:click={triggerFilePicker}>导入文件</button>
			<input bind:this={fileInput} type="file" accept=".md,.mdx,text/markdown,text/plain" on:change={handleFileChange} class="sr-only" />

			<label class="toggle-item">
				<span>KaTeX</span>
				<input type="checkbox" bind:checked={enableKatex}>
			</label>

			<label class="toggle-item">
				<span>Mermaid</span>
				<input type="checkbox" bind:checked={enableMermaid}>
			</label>

			<button type="button" class="render-btn" on:click={renderMarkdown}>渲染</button>
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

	<section class="pane border-t border-black/8 dark:border-white/8">
		<div class="pane-title">渲染结果</div>
		<div class="md-preview prose dark:prose-invert max-w-none">
			{@html renderedHtml}
		</div>
	</section>

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
		padding: 1rem 1.2rem 2rem;
	}

	.import-btn {
		padding-bottom: 0.1rem;
		border-bottom: 1px solid transparent;
		color: rgb(0 0 0 / 0.72);
		transition: all 0.2s ease;
	}

	.import-btn:hover {
		border-bottom-color: var(--primary);
		color: var(--primary);
		text-shadow: 0 0 10px rgb(0 0 0 / 0.12);
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
		transition: opacity 0.2s ease;
	}

	.render-btn:hover {
		opacity: 0.88;
	}
</style>
