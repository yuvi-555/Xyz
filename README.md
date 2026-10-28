# Yogesh Kokane | Portfolio

A one-page portfolio for Yogesh Kokane, copywriter and scriptwriter (Solapur, India). It is built like a screenplay: each section is a scene. Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Structure

```
index.html        page markup (sections, nav, typewriter)
css/styles.css    all styling, light and dark themes
js/data.js        CONTENT: lines, campaigns, work history, films, blog posts, book quotes
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
| `Q` | Pull quotes from the book draft |

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
