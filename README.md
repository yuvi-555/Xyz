# Yogesh Kokane | Portfolio

A one-page portfolio for Yogesh Kokane, copywriter and scriptwriter (Solapur, India). It is built like a screenplay: each section is a scene. Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Structure

```
index.html        page markup (sections, nav, typewriter)
css/styles.css    all styling, light and dark themes
js/data.js        CONTENT: lines, campaigns, work history, films, blog posts
js/main.js        behavior: hero, film strip, reader, typewriter brief, nav
images/           artwork thumbnails used in "Outside the brief"
```

## Run locally

Open `index.html` in a browser. Or serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Edit content

Most changes happen in `js/data.js`:

| Variable | What it controls |
|---|---|
| `L` | Lines on the film strip and hero subtitles (`l` = language: `mr`, `en`, `hi`; `h:1` = show in hero; `p:1` = hero only) |
| `OL` | Links from a line to its original post (matched by the start of the line) |
| `C` | Campaign posters on "The wall" |
| `E` | Work history and projects |
| `F` | Films, songs and videos |
| `B` | Blog posts |
| Blog posts | Long-form writing samples and article links are in `index.html` |

Artwork captions and the "Also" list are in `index.html`. Colors are CSS variables at the top of `css/styles.css`.

## Deploy

**GitHub Pages**
1. Create a repository on GitHub and push this folder.
2. Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your site appears at `https://<username>.github.io/<repository>/`.

**Netlify or Cloudflare Pages:** drag and drop the folder, or connect the repository. Build command: none. Publish directory: `/`.

```
git init
git add .
git commit -m "Portfolio v1"
git branch -M main
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

## Notes

- "See the original" links point to Google Drive files. They open for visitors only if the files are shared as "Anyone with the link can view".
- Fonts (Fraunces, Courier Prime, Mukta) load from Google Fonts. Fallback fonts are set.
- Contact details are in `index.html` (search for `yogeshkokane14@gmail.com`).
- Page text follows one rule: only original work, never translated into other languages to fill a section.


## Source of truth and change-safety rules

**Notion is the editorial source of truth; this repository is the deployed implementation.** Before changing copy, sections, links, experience, or project details, read the canonical Notion portfolio and the maintenance checklist:

- Canonical Notion portfolio: https://app.notion.com/p/400e88f5786381c19822cea98e59e093
- Repository maintenance checklist: [PORTFOLIO_MAINTENANCE.md](./PORTFOLIO_MAINTENANCE.md)

### Non-negotiable safeguards

1. **Preserve existing navigation and destinations.** Do not remove the Notion portfolio link from the top navigation or the “Full portfolio on Notion” hero button. Do not remove email, WhatsApp, LinkedIn, Instagram, Letterboxd, or blog links unless the owner explicitly requests it.
2. **Make minimal, targeted edits.** Avoid replacing whole files when a small edit will do. Preserve unrelated sections, content, links, CSS, accessibility labels, and interactive behavior.
3. **Use evidence for personal facts.** Use the canonical Notion page and user-provided LinkedIn screenshots/data. Do not infer employment status, dates, titles, skills, certifications, metrics, or achievements. Where sources conflict, flag the conflict rather than silently choosing.
4. **Check content against Notion.** Keep public-facing claims aligned with the current Notion portfolio. If the website needs to differ for layout reasons, do not change the factual meaning.
5. **Verify before declaring completion.** Inspect the changed diff; confirm required Notion links remain present; check internal section anchors and asset paths; deploy; confirm Vercel state is READY and the production alias points to the new deployment. Never claim images or pages were visually verified unless they were actually inspected.
6. **Update both places when the change affects portfolio facts.** When a role, date, project, skill, or achievement changes, update the canonical Notion portfolio (or the relevant Notion child page) and the website repository. If the source evidence is incomplete, mark the detail as needing confirmation rather than inventing it.
7. **No destructive cleanups without permission.** Never remove sections or links merely because they seem redundant. Preserve user-established layout and calls to action unless the owner approves removal.

Before every release, use this checklist:
- [ ] Notion link in navigation remains present.
- [ ] Notion link in hero remains present.
- [ ] Contact and social links remain present.
- [ ] Experience and skills are evidence-based and dates are consistent.
- [ ] All page sections and original work links are preserved.
- [ ] Asset paths and image sources are checked.
- [ ] Diff reviewed; deployment READY; production alias verified.
