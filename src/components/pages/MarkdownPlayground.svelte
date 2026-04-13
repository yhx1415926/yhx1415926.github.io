<script lang="ts">
import katex from "katex";
import { marked } from "marked";
import "katex/dist/katex.min.css";
import hljs from "highlight.js";
import { onMount, tick } from "svelte";

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
let mermaidApi: any = null;
let enableKatex = true;
let enableMermaid = true;
let isRendering = false;
let fileInput: HTMLInputElement | null = null;
let previewContainer: HTMLDivElement | null = null;

const FENCED_CODE_TOKEN = "@@FENCED_CODE_";
const INLINE_CODE_TOKEN = "@@INLINE_CODE_";
const MATH_TOKEN = "@@MATH_";

const buildGithubCard = (repo: string) => {
	const trimmedRepo = repo.trim();
	if (!trimmedRepo.includes("/")) {
		return '<div class="hidden">Invalid repository. (repo must be in owner/repo format)</div>';
	}
	const [owner, name] = trimmedRepo.split("/");
	const cardUuid = `GC${Math.random().toString(36).slice(-6)}`;

	return `
<a id="${cardUuid}-card" class="card-github fetch-waiting no-styling" href="https://github.com/${trimmedRepo}" target="_blank" repo="${trimmedRepo}">
  <div class="gc-titlebar">
    <div class="gc-titlebar-left">
      <div class="gc-owner">
        <div id="${cardUuid}-avatar" class="gc-avatar"></div>
        <div class="gc-user">${owner}</div>
      </div>
      <div class="gc-divider">/</div>
      <div class="gc-repo">${name}</div>
    </div>
    <div class="github-logo"></div>
  </div>
  <div id="${cardUuid}-description" class="gc-description">Waiting for api.github.com...</div>
  <div class="gc-infobar">
    <div id="${cardUuid}-stars" class="gc-stars">00K</div>
    <div id="${cardUuid}-forks" class="gc-forks">0K</div>
    <div id="${cardUuid}-license" class="gc-license">0K</div>
    <span id="${cardUuid}-language" class="gc-language">Waiting...</span>
  </div>
</a>`;
};

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

	md = md.replace(
		/::github\{\s*repo=["']([^"']+)["']\s*\}/g,
		(_, repo: string) => {
			return `\n${buildGithubCard(repo)}\n`;
		},
	);

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

		md = md.replace(
			/(^|[^\\])\$(.+?)\$/g,
			(match, prefix: string, formula: string) => {
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
			},
		);
	}

	md = md.replace(
		new RegExp(`${INLINE_CODE_TOKEN}(\\d+)@@`, "g"),
		(_, i) => inlineCodes[Number(i)],
	);
	md = md.replace(
		new RegExp(`${FENCED_CODE_TOKEN}(\\d+)@@`, "g"),
		(_, i) => fencedCodes[Number(i)],
	);

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

const renderGithubCards = async () => {
	if (!previewContainer) {
		return;
	}

	const cards = Array.from(
		previewContainer.querySelectorAll<HTMLAnchorElement>("a.card-github[repo]"),
	);
	await Promise.all(
		cards.map(async (card) => {
			const repo = card.getAttribute("repo");
			if (!repo) return;
			try {
				const response = await fetch(`https://api.github.com/repos/${repo}`, {
					referrerPolicy: "no-referrer",
				});
				const data = await response.json();
				const cardId = card.id.replace(/-card$/, "");
				const setText = (suffix: string, text: string) => {
					const el = document.getElementById(`${cardId}-${suffix}`);
					if (el) el.textContent = text;
				};
				setText(
					"description",
					data.description?.replace(/:[a-zA-Z0-9_]+:/g, "") ||
						"Description not set",
				);
				setText("language", data.language || "Unknown");
				setText(
					"forks",
					Intl.NumberFormat("en-us", {
						notation: "compact",
						maximumFractionDigits: 1,
					})
						.format(data.forks || 0)
						.replaceAll("\u202f", ""),
				);
				setText(
					"stars",
					Intl.NumberFormat("en-us", {
						notation: "compact",
						maximumFractionDigits: 1,
					})
						.format(data.stargazers_count || 0)
						.replaceAll("\u202f", ""),
				);
				setText("license", data.license?.spdx_id || "no-license");
				const avatar = document.getElementById(
					`${cardId}-avatar`,
				) as HTMLDivElement | null;
				if (avatar && data.owner?.avatar_url) {
					avatar.style.backgroundImage = `url(${data.owner.avatar_url}&s=32)`;
					avatar.style.backgroundColor = "transparent";
				}
				card.classList.remove("fetch-waiting");
			} catch {
				card.classList.add("fetch-error");
			}
		}),
	);
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

		const blocks = document.querySelectorAll<HTMLDivElement>(
			".md-preview .mermaid[data-mermaid-code]",
		);
		await Promise.all(
			Array.from(blocks).map(async (el, index) => {
				const code = el.dataset.mermaidCode ?? "";
				const { svg } = await mermaidApi.render(
					`preview-mermaid-${Date.now()}-${index}`,
					code,
				);
				el.innerHTML = svg;
			}),
		);
	} catch (error) {
		console.warn("Mermaid 渲染失败", error);
	}
};

const renderCodeHighlight = () => {
	try {
		if (!previewContainer) {
			return;
		}
		previewContainer.querySelectorAll("pre code").forEach((el) => {
			hljs.highlightElement(el);
		});
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
		const { md, mathFragments } = preprocessMarkdown(markdownText);
		const rawHtml = marked.parse(md, {
			gfm: true,
			breaks: true,
		}) as string;

		let html = transformMermaidBlocks(rawHtml);
		if (enableKatex) {
			html = html.replace(
				new RegExp(`${MATH_TOKEN}(\\d+)@@`, "g"),
				(_, i) => mathFragments[Number(i)] || "",
			);
		}

		renderedHtml = html;
		await tick();
		await runScripts();
		await renderGithubCards();
		renderCodeHighlight();
		await renderMermaid();
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
