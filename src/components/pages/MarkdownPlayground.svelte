<script lang="ts">
import katex from "katex";
import { marked } from "marked";
import "katex/dist/katex.min.css";
import { onMount, tick } from "svelte";

const demoMarkdown = `---
title: Markdown 渲染测试
---

# 在线 Markdown 预览器

支持 KaTeX、Mermaid、HTML、脚本执行与 GitHub 仓库名片。

## 代码高亮 + 行标记 + 文本标记

\`\`\`ts title="main.ts" frame="code" {1,3-4} ins={6} del={2} mark="add"
const greet = (name: string) => \`hello \${name}\`;
const add = (a: number, b: number) => a + b;
console.log(greet("Firefly"));
console.log(add(1, 2));
\`\`\`

## 终端框架 + 起始行号 + 自动换行 + 可折叠

\`\`\`bash title="deploy.sh" frame="terminal" ln=20 wrap collapse
pnpm install --frozen-lockfile && pnpm build && pnpm preview
\`\`\`

## diff 语法

\`\`\`diff-ts title="diff.ts"
-const version = "1.0.0";
+const version = "2.0.0";
 const stable = true;
\`\`\`

## 正则与转义斜杠

\`\`\`js mark=/https?:\/\/[^\s]+/g
const re = /https?:\/\/[^\s]+/g;
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

type CodeMeta = {
	lang: string;
	title?: string;
	frame?: "code" | "terminal" | "none";
	wrap?: boolean;
	collapse?: boolean;
	startLineNumber?: number;
	markLines: number[];
	insLines: number[];
	delLines: number[];
	markTexts: string[];
	insTexts: string[];
	delTexts: string[];
	markRegexes: RegExp[];
};

let markdownText = demoMarkdown;
let renderedHtml = "";
let uploadError = "";
let mermaidApi: any = null;
let highlightApi: any = null;
let enableKatex = true;
let enableMermaid = true;
let isRendering = false;
let fileInput: HTMLInputElement | null = null;
let previewContainer: HTMLDivElement | null = null;

const FENCED_CODE_TOKEN = "@@FENCED_CODE_";
const INLINE_CODE_TOKEN = "@@INLINE_CODE_";
const MATH_TOKEN = "@@MATH_";
const REGEX_LITERAL_PATTERN = new RegExp(String.raw`^\/((?:\\\/|[^\/])+?)\/([gimsuyd]*)$`);

const escapeHtml = (input: string) =>
	input
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");

const parseLineRange = (value: string) => {
	const values = new Set<number>();
	for (const part of value.split(",").map((v) => v.trim()).filter(Boolean)) {
		if (/^\d+-\d+$/.test(part)) {
			const [a, b] = part.split("-").map(Number);
			const [start, end] = a <= b ? [a, b] : [b, a];
			for (let i = start; i <= end; i += 1) values.add(i);
		} else if (/^\d+$/.test(part)) {
			values.add(Number(part));
		}
	}
	return [...values].sort((a, b) => a - b);
};

const parseRegexLiteral = (raw: string) => {
	const match = raw.match(REGEX_LITERAL_PATTERN);
	if (!match) return null;
	try {
		return new RegExp(match[1].replaceAll("\\/", "/"), match[2] || "");
	} catch {
		return null;
	}
};

const normalizeKatexFormula = (formula: string) =>
	formula
		.replaceAll("’", "'")
		.replaceAll("‘", "'")
		.replaceAll("“", '"')
		.replaceAll("”", '"');

const renderKatexFragment = (formula: string, displayMode: boolean) =>
	katex.renderToString(normalizeKatexFormula(formula).trim(), {
		throwOnError: false,
		strict: "ignore",
		displayMode,
	});

const parseCodeMeta = (infoRaw: string): CodeMeta => {
	const info = infoRaw.trim();
	const [rawLang = "text", ...rest] = info.split(/\s+/);
	let lang = rawLang;
	const metaText = rest.join(" ");
	const attrs = new Map<string, string>();
	const markLinesFromBrace = metaText.match(/\{([^}]+)\}/)?.[1];
	for (const m of metaText.matchAll(/(\w+)=("[^"]*"|'[^']*'|\{[^}]*\}|\/((?:\\/|[^/])+?)\/[gimsuyd]*|[^\s]+)/g)) {
		attrs.set(m[1], m[2]);
	}
	for (const flag of ["wrap", "collapse"]) {
		if (new RegExp(`\\b${flag}\\b`).test(metaText) && !attrs.has(flag)) {
			attrs.set(flag, "true");
		}
	}
	if (lang.startsWith("diff-")) lang = lang.slice(5);

	const unquote = (v?: string) => (v ? v.replace(/^['"{]|['"}]$/g, "") : "");
	const parseTextList = (v?: string) =>
		unquote(v)
			.split("|")
			.map((t) => t.trim())
			.filter(Boolean);
	const parseRegexList = (v?: string) => {
		const raw = unquote(v);
		if (!raw) return [];
		if (raw.startsWith("/") && raw.lastIndexOf("/") > 0) {
			const re = parseRegexLiteral(raw);
			return re ? [re] : [];
		}
		return raw
			.split("|")
			.map((part) => parseRegexLiteral(part.trim()))
			.filter((v): v is RegExp => Boolean(v));
	};

	const startLine = Number.parseInt(unquote(attrs.get("ln") || attrs.get("startLineNumber")) || "1", 10);
	const frame = (unquote(attrs.get("frame")) || "") as CodeMeta["frame"];

	return {
		lang,
		title: unquote(attrs.get("title")) || undefined,
		frame: frame && ["code", "terminal", "none"].includes(frame) ? frame : undefined,
		wrap: unquote(attrs.get("wrap")) === "true",
		collapse: unquote(attrs.get("collapse")) === "true",
		startLineNumber: Number.isFinite(startLine) && startLine > 0 ? startLine : 1,
		markLines: parseLineRange(unquote(attrs.get("markLines") || markLinesFromBrace || "")),
		insLines: parseLineRange(unquote(attrs.get("ins") || "")),
		delLines: parseLineRange(unquote(attrs.get("del") || "")),
		markTexts: parseTextList(attrs.get("mark")),
		insTexts: parseTextList(attrs.get("insText")),
		delTexts: parseTextList(attrs.get("delText")),
		markRegexes: parseRegexList(attrs.get("mark") || attrs.get("markRe")),
	};
};

const buildCodeBlockHtml = (code: string, infoString?: string) => {
	const meta = parseCodeMeta(infoString || "");
	const escapedCode = escapeHtml(code);
	const attrs = {
		lang: meta.lang || "text",
		title: meta.title || "",
		frame: meta.frame || "code",
		wrap: String(Boolean(meta.wrap)),
		collapse: String(Boolean(meta.collapse)),
		lineStart: String(meta.startLineNumber || 1),
		markLines: meta.markLines.join(","),
		insLines: meta.insLines.join(","),
		delLines: meta.delLines.join(","),
		markTexts: meta.markTexts.map(escapeHtml).join("||"),
		insTexts: meta.insTexts.map(escapeHtml).join("||"),
		delTexts: meta.delTexts.map(escapeHtml).join("||"),
		markRegexes: meta.markRegexes.map((re) => escapeHtml(re.toString())).join("||"),
	};

	const titleHtml = meta.title ? `<div class="code-title">${escapeHtml(meta.title)}</div>` : "";
	const collapseButton = meta.collapse
		? '<button type="button" class="code-collapse-btn" data-collapse-btn>展开代码</button>'
		: "";
	return `<div class="ec-block" data-frame="${attrs.frame}" data-wrap="${attrs.wrap}" data-collapse="${attrs.collapse}" data-line-start="${attrs.lineStart}" data-mark-lines="${attrs.markLines}" data-ins-lines="${attrs.insLines}" data-del-lines="${attrs.delLines}" data-mark-texts="${attrs.markTexts}" data-ins-texts="${attrs.insTexts}" data-del-texts="${attrs.delTexts}" data-mark-regexes="${attrs.markRegexes}">${titleHtml}<pre><code class="language-${attrs.lang}">${escapedCode}</code></pre>${collapseButton}</div>`;
};

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
		(_, repo: string) => `\n${buildGithubCard(repo)}\n`,
	);

	if (enableKatex) {
		md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, formula: string) => {
			try {
				const html = renderKatexFragment(formula, true);
				const index = mathFragments.push(html) - 1;
				return `${MATH_TOKEN}${index}@@`;
			} catch {
				return `$$${formula}$$`;
			}
		});
		md = md.replace(/(^|[^\\])\$(.+?)\$/g, (match, prefix: string, formula: string) => {
			if (!formula.trim() || formula.includes("\n")) return match;
			try {
				const html = renderKatexFragment(formula, false);
				const index = mathFragments.push(html) - 1;
				return `${prefix}${MATH_TOKEN}${index}@@`;
			} catch {
				return match;
			}
		});
	}

	md = md.replace(new RegExp(`${INLINE_CODE_TOKEN}(\\d+)@@`, "g"), (_, i) => inlineCodes[Number(i)]);
	md = md.replace(new RegExp(`${FENCED_CODE_TOKEN}(\\d+)@@`, "g"), (_, i) => fencedCodes[Number(i)]);
	return { md, mathFragments };
};

const transformMermaidBlocks = (html: string) => {
	if (!enableMermaid) return html;
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
	if (typeof window === "undefined") return null;
	if ((window as any).mermaid) return (window as any).mermaid;
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

const loadHighlight = async () => {
	if (typeof window === "undefined") return null;
	if ((window as any).hljs) return (window as any).hljs;
	await new Promise<void>((resolve, reject) => {
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/highlight.min.js";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("highlight.js 加载失败"));
		document.head.appendChild(script);
	});
	return (window as any).hljs ?? null;
};

const applyTextMarkers = (line: string, texts: string[], className: string) => {
	let output = line;
	for (const text of texts) {
		if (!text) continue;
		output = output.replaceAll(text, `<span class="${className}">${text}</span>`);
	}
	return output;
};

const applyRegexMarkers = (line: string, regexes: RegExp[]) => {
	let output = line;
	for (const reg of regexes) {
		output = output.replace(reg, (m) => `<span class="tm-mark">${m}</span>`);
	}
	return output;
};

const decorateCodeBlocks = () => {
	if (!previewContainer) return;
	const blocks = previewContainer.querySelectorAll<HTMLElement>(".ec-block");
	for (const block of blocks) {
		const pre = block.querySelector("pre");
		const code = block.querySelector("code");
		if (!pre || !code) continue;
		const startLine = Number.parseInt(block.dataset.lineStart || "1", 10) || 1;
		const markLines = parseLineRange(block.dataset.markLines || "");
		const insLines = parseLineRange(block.dataset.insLines || "");
		const delLines = parseLineRange(block.dataset.delLines || "");
		const markTexts = (block.dataset.markTexts || "").split("||").filter(Boolean);
		const insTexts = (block.dataset.insTexts || "").split("||").filter(Boolean);
		const delTexts = (block.dataset.delTexts || "").split("||").filter(Boolean);
		const markRegexes = (block.dataset.markRegexes || "").split("||").map((v) => parseRegexLiteral(v)).filter((v): v is RegExp => Boolean(v));

		const src = code.innerHTML.split("\n");
		const lines = src.map((line, index) => {
			const lineNo = index + 1;
			let lineHtml = line.length ? line : "&nbsp;";
			lineHtml = applyTextMarkers(lineHtml, markTexts, "tm-mark");
			lineHtml = applyTextMarkers(lineHtml, insTexts, "tm-ins");
			lineHtml = applyTextMarkers(lineHtml, delTexts, "tm-del");
			lineHtml = applyRegexMarkers(lineHtml, markRegexes);

			const classes = ["ec-line"];
			if (markLines.includes(lineNo)) classes.push("is-mark");
			if (insLines.includes(lineNo)) classes.push("is-ins");
			if (delLines.includes(lineNo)) classes.push("is-del");
			if (lineHtml.startsWith("+")) classes.push("is-ins");
			if (lineHtml.startsWith("-")) classes.push("is-del");
			return `<span class="${classes.join(" ")}" data-lno="${startLine + index}">${lineHtml}</span>`;
		});
		code.innerHTML = lines.join("\n");
		if (block.dataset.wrap === "true") pre.classList.add("code-wrap");
		if (block.dataset.frame === "terminal") block.classList.add("frame-terminal");
		if (block.dataset.frame === "none") block.classList.add("frame-none");
		if (block.dataset.collapse === "true") {
			block.classList.add("is-collapsed");
			const btn = block.querySelector<HTMLButtonElement>("[data-collapse-btn]");
			btn?.addEventListener("click", () => {
				const collapsed = block.classList.toggle("is-collapsed");
				btn.textContent = collapsed ? "展开代码" : "收起代码";
			});
		}
	}
};

const runScripts = async () => {
	if (!previewContainer) return;
	const scripts = Array.from(previewContainer.querySelectorAll("script"));
	for (const oldScript of scripts) {
		const newScript = document.createElement("script");
		for (const attr of oldScript.attributes) newScript.setAttribute(attr.name, attr.value);
		newScript.textContent = oldScript.textContent;
		oldScript.replaceWith(newScript);
	}
};

const renderGithubCards = async () => {
	if (!previewContainer) return;
	const cards = Array.from(previewContainer.querySelectorAll<HTMLAnchorElement>("a.card-github[repo]"));
	await Promise.all(cards.map(async (card) => {
		const repo = card.getAttribute("repo");
		if (!repo) return;
		try {
			const response = await fetch(`https://api.github.com/repos/${repo}`, { referrerPolicy: "no-referrer" });
			const data = await response.json();
			const cardId = card.id.replace(/-card$/, "");
			const setText = (suffix: string, text: string) => {
				const el = document.getElementById(`${cardId}-${suffix}`);
				if (el) el.textContent = text;
			};
			setText("description", data.description?.replace(/:[a-zA-Z0-9_]+:/g, "") || "Description not set");
			setText("language", data.language || "Unknown");
			setText("forks", Intl.NumberFormat("en-us", { notation: "compact", maximumFractionDigits: 1 }).format(data.forks || 0).replaceAll(" ", ""));
			setText("stars", Intl.NumberFormat("en-us", { notation: "compact", maximumFractionDigits: 1 }).format(data.stargazers_count || 0).replaceAll(" ", ""));
			setText("license", data.license?.spdx_id || "no-license");
			const avatar = document.getElementById(`${cardId}-avatar`) as HTMLDivElement | null;
			if (avatar && data.owner?.avatar_url) {
				avatar.style.backgroundImage = `url(${data.owner.avatar_url}&s=32)`;
				avatar.style.backgroundColor = "transparent";
			}
			card.classList.remove("fetch-waiting");
		} catch {
			card.classList.add("fetch-error");
		}
	}));
};

const renderMermaid = async () => {
	if (!enableMermaid) return;
	try {
		if (!mermaidApi) mermaidApi = await loadMermaid();
		if (!mermaidApi) return;
		const isDark = document.documentElement.classList.contains("dark");
		mermaidApi.initialize({ startOnLoad: false, securityLevel: "loose", theme: isDark ? "dark" : "default" });
		const blocks = document.querySelectorAll<HTMLDivElement>(".md-preview .mermaid[data-mermaid-code]");
		await Promise.all(Array.from(blocks).map(async (el, index) => {
			const code = el.dataset.mermaidCode ?? "";
			const { svg } = await mermaidApi.render(`preview-mermaid-${Date.now()}-${index}`, code);
			el.innerHTML = svg;
		}));
	} catch (error) {
		console.warn("Mermaid 渲染失败", error);
	}
};

const renderCodeHighlight = async () => {
	try {
		if (!highlightApi) highlightApi = await loadHighlight();
		if (!highlightApi || !previewContainer) return;
		previewContainer.querySelectorAll("pre code").forEach((el) => {
			highlightApi.highlightElement(el);
		});
		decorateCodeBlocks();
	} catch (error) {
		console.warn("代码高亮渲染失败", error);
	}
};

marked.use({
	renderer: {
		code(token) {
			return buildCodeBlockHtml(token.text, token.lang || "");
		},
	},
});

const renderMarkdown = async () => {
	if (isRendering) return;
	isRendering = true;
	uploadError = "";
	try {
		const { md, mathFragments } = preprocessMarkdown(markdownText);
		const rawHtml = marked.parse(md, { gfm: true, breaks: true }) as string;
		let html = transformMermaidBlocks(rawHtml);
		if (enableKatex) {
			html = html.replace(new RegExp(`${MATH_TOKEN}(\\d+)@@`, "g"), (_, i) => mathFragments[Number(i)] || "");
		}
		renderedHtml = html;
		await tick();
		await runScripts();
		await renderGithubCards();
		await renderCodeHighlight();
		await renderMermaid();
	} finally {
		isRendering = false;
	}
};

const triggerFilePicker = () => fileInput?.click();

const handleFileChange = async (event: Event) => {
	uploadError = "";
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];
	if (!file) return;
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
			<p class="text-sm text-50 mt-1">已补全：行/文本标记、diff、框架类型、换行、折叠、起始行号等。</p>
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
		<textarea bind:value={markdownText} spellcheck="false" class="editor" placeholder="在这里粘贴 posts 中的 .md/.mdx 内容..."></textarea>
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
	:global(.katex-display) { overflow-x: auto; overflow-y: hidden; padding: 0.2rem 0; }
	.pane { display: flex; flex-direction: column; }
	.pane-title { font-size: 0.85rem; color: rgb(0 0 0 / 0.55); padding: 0.75rem 1rem; border-bottom: 1px solid rgb(0 0 0 / 0.08); }
	:global(.dark) .pane-title { color: rgb(255 255 255 / 0.6); border-bottom-color: rgb(255 255 255 / 0.08); }
	.editor { width: 100%; min-height: 22rem; padding: 1rem; resize: vertical; outline: none; font-size: 0.92rem; line-height: 1.7; font-family: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; background: transparent; }
	.md-preview { padding: 0.2rem 0 2rem; }
	.preview-divider { margin: 1.25rem 0; border-top: 1px dashed var(--line-divider); }
	.import-btn { padding: 0.3rem 0.65rem; border-radius: 0.5rem; color: rgb(0 0 0 / 0.72); transition: all 0.18s ease; }
	.import-btn:hover { background: var(--btn-regular-bg-hover); color: var(--primary); }
	:global(.dark) .import-btn { color: rgb(255 255 255 / 0.72); }
	:global(.dark) .import-btn:hover { text-shadow: 0 0 10px rgb(255 255 255 / 0.24); }
	.toggle-item { display: inline-flex; align-items: center; gap: 0.4rem; color: rgb(0 0 0 / 0.72); padding: 0.25rem 0.5rem; border-radius: 0.5rem; transition: background 0.18s ease; }
	.toggle-item:hover { background: var(--btn-regular-bg-hover); }
	.toggle-item input { cursor: pointer; }
	:global(.dark) .toggle-item { color: rgb(255 255 255 / 0.72); }
	.render-btn { padding: 0.35rem 0.85rem; border-radius: 0.5rem; background: var(--primary); color: #fff; font-weight: 600; transition: all 0.18s ease; }
	.render-btn:hover { opacity: 0.88; }
	.control-btn { cursor: pointer; }
	.control-btn:active { transform: translateY(1px); box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.2); }
	.render-btn:disabled { cursor: not-allowed; opacity: 0.55; box-shadow: none; transform: none; }
	:global(.md-preview .ec-block) { border: 1px solid var(--line-divider); border-radius: 0.85rem; overflow: hidden; margin: 1rem 0; }
	:global(.md-preview .ec-block.frame-none) { border: none; border-radius: 0; }
	:global(.md-preview .ec-block.frame-terminal .code-title)::before { content: "● ● ●"; letter-spacing: 0.25rem; margin-right: 0.8rem; color: #f87171; }
	:global(.md-preview .code-title) { font-size: 0.8rem; padding: 0.45rem 0.8rem; color: rgb(0 0 0 / 0.65); border-bottom: 1px solid var(--line-divider); }
	:global(.dark .md-preview .code-title) { color: rgb(255 255 255 / 0.65); }
	:global(.md-preview pre) { background: var(--codeblock-bg); border-radius: 0; padding: 0.85rem 1rem; overflow-x: auto; margin: 0 !important; }
	:global(.md-preview pre.code-wrap code) { white-space: pre-wrap !important; overflow-wrap: anywhere; }
	:global(.md-preview pre code) { background: transparent; color: inherit; padding: 0; border-radius: 0; display: block; counter-reset: code-line; }
	:global(.md-preview .ec-line) { display: block; position: relative; padding-left: 3.6rem; min-height: 1.5rem; }
	:global(.md-preview .ec-line::before) { content: attr(data-lno); position: absolute; left: 0.2rem; width: 2.6rem; text-align: right; color: rgb(125 125 125 / 0.75); }
	:global(.md-preview .ec-line.is-mark) { background: color-mix(in oklab, var(--primary) 16%, transparent); }
	:global(.md-preview .ec-line.is-ins) { background: rgb(34 197 94 / 15%); }
	:global(.md-preview .ec-line.is-del) { background: rgb(239 68 68 / 15%); }
	:global(.md-preview .tm-mark) { background: color-mix(in oklab, var(--primary) 24%, transparent); border-radius: 0.2rem; }
	:global(.md-preview .tm-ins) { background: rgb(34 197 94 / 25%); border-radius: 0.2rem; }
	:global(.md-preview .tm-del) { background: rgb(239 68 68 / 25%); border-radius: 0.2rem; text-decoration: line-through; }
	:global(.md-preview .code-collapse-btn) { width: 100%; border-top: 1px solid var(--line-divider); background: transparent; padding: 0.4rem; font-size: 0.8rem; cursor: pointer; }
	:global(.md-preview .ec-block.is-collapsed pre) { max-height: 11rem; overflow: hidden; }
</style>
