# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

riverlin.me — a personal portfolio single-page app for an "AI PM & Agent Engineer". Content (projects and articles) is in Chinese. The site has a homepage plus per-project and per-article detail pages. There is no backend; everything is static and data-driven.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b && vite build  — type errors FAIL the build
npm run lint     # eslint over the repo
npm run preview  # serve the production build locally
```

There is no test framework. After a content or component change, `npm run build` is the verification step (it both type-checks and bundles).

## Architecture

**Content is data-driven and is the main thing you edit.** The two files in `src/data/` are the single source of truth:

- `src/data/projects.ts` — `projects: Project[]` + `getProjectById()`
- `src/data/articles.ts` — `articles: Article[]` + `getArticleById()`

Adding a project or article means appending a typed object to the array. List rendering and routing pick it up automatically — you do **not** wire up new pages. Both files define their own TypeScript interfaces at the top; match them exactly.

**Routing** (`src/App.tsx`, react-router-dom v7): `/` → `HomePage` (Navbar + Hero + Projects + Writings + Footer), `/project/:id` → `ProjectDetail`, `/article/:id` → `ArticleDetail`. Page transitions use framer-motion `AnimatePresence`. The list components (`Projects.tsx`, `Writings.tsx`) map over the data arrays in order; **array order is display order (newest first)**.

**Articles render Markdown.** An article's `content` field is a Markdown string. `ArticleDetail.tsx` renders it with `react-markdown` + `remark-gfm`. Element styling is **not** in CSS — it lives in the `markdownComponents` map inside `ArticleDetail.tsx` (inline styles per `h2`/`p`/`img`/etc.). Adjust rendering there.

**Projects with detail pages.** A project gets a detail page only when it has `featured: true` and a `detail` object (`ProjectDetailData`). `href` may be an external URL (GitHub) or an internal route; `appUrl` likewise points to a live demo (external or an internal path like `/fragments`).

## Conventions

- **Styling uses design tokens, not a CSS framework.** Components use inline `style={{}}` objects that reference CSS custom properties defined in `src/index.css` `:root` — `--bg-primary/secondary`, `--text-primary/secondary/muted`, `--border`, `--shadow`/`--shadow-hover`, and the font stacks `--font-sans/heading/mono`. Reuse these tokens; do not hardcode colors or introduce CSS modules / Tailwind.
- **Article `content` is a JS template literal.** A raw backtick inside it terminates the string and breaks the build — escape as `` \` `` or avoid inline code. Watch for `${` as well.
- **WeChat (公众号) article images** are referenced directly by their `mmbiz.qpic.cn` URLs. These have Referer-based hotlink protection (防盗链) and may intermittently break when loaded from this domain; this trade-off is accepted rather than mirroring images locally.

## Workflow: importing a WeChat (公众号) article → Markdown → site

The recurring task is turning the owner's published 公众号 articles into entries in `src/data/articles.ts`.

1. **Get the Markdown.** `WebFetch` on a `mp.weixin.qq.com/s/...` URL usually fails — WeChat returns an "环境异常 / 去验证" anti-bot page to server-side fetches. So the user supplies the body: exported via an online converter (e.g. Quaily wx-to-markdown) or a browser extension, or pasted as text/`.md`.
2. **Clean the export.** Typical artifacts to fix: a duplicated intro (the export sometimes captures two drafts), `* * *` → `---`, `-   • ` list markers → `- `, and `#imgIndex=N` fragments stripped from image URLs. Normalize headings to `##`/`###`.
3. **Reconstruct lost math.** Exports drop LaTeX/formula content, leaving empty `（）` and dangling fragments like `即 ；`. Fill in the standard textbook formulas inline (the preserved `mmbiz` images carry the authoritative version and back you up). Flag any guessed example values to the user for verification.
4. **Add the entry.** Define `const fooContent = \`...markdown...\`` then prepend a new `Article` object to the array (newest first). Keep images as `![](https://mmbiz.qpic.cn/...)`. Remember the template-literal backtick caveat above.
5. **Metadata the user must provide:** `originalUrl` (the 公众号 link), the publish `date` (`YYYY.MM.DD`), and `readNum`/`likeNum`/`shareNum` (from the 公众号 backend — not scrapeable). Draft `title`/`album`/`tags`/`description` from the content and let them adjust.
6. **Verify** with `npm run build`.
