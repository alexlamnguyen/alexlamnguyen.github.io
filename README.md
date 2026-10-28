# Minimal Portfolio — Light Mode

A simple, text-focused personal website with **Home** and **Projects**, inspired by the clean layout of adikuma.com. **Résumé** opens `assets/resume.pdf` directly in a new tab. There is no résumé page, Writing tab, or theme toggle.

## Easiest way to edit

1. Unzip the folder and open it in **Visual Studio Code** (File → Open Folder).
2. Edit **`content.js`** to change the name, bio, contact links, and projects. Save.
3. Open **`index.html`** in a browser; refresh to see your changes. Or install VS Code's **Live Server** extension and choose **Open with Live Server** for automatic refresh.
4. You generally **do not need to edit HTML, CSS, or `app.js`**.

## How to add images (no HTML needed)

Put `.jpg`, `.png`, or `.webp` photos into the **`assets`** folder, for example:

```text
minimal-portfolio-light-images/
  index.html
  content.js
  app.js
  styles.css
  assets/
    profile.jpg
    tube-amp.jpg
    tube-amp-pcb.jpg
    resume.pdf
```

**Profile picture:** in `content.js`, change:

```js
photo: "assets/profile.jpg",
```

**Project pictures:** inside a project's entry in `content.js`, change the `images` line to:

```js
images: ["assets/tube-amp.jpg", "assets/tube-amp-pcb.jpg"],
```

- `images: []` shows no images on that project.
- List as many photos as you want. They appear beneath the description on that project's own page in a responsive gallery. Clicking one opens it full-size in a new tab.
- To add alt text and captions, use optional image objects:

Image objects also accept `fullWidth: true` for wide schematics and `original: "assets/source.png"` to open an unarranged original when clicked. The PLL collage is an SVG containing the unchanged source PNG in overlapping panels; regenerate it with `node scripts/arrange-pll.cjs` after reviewing crop coordinates if the source changes. All original uploads remain intact.

```js
images: [
  { src: "assets/tube-amp.jpg", alt: "Finished vacuum-tube amplifier", caption: "Completed enclosure" },
  { src: "assets/tube-amp-pcb.jpg", alt: "Headphone amplifier PCB" }
],
```

**Tip:** Resize large photos to ~1200–1600 px wide or save as WebP to keep the page fast. Filenames must match exactly (including capital letters), and there must be a comma between filenames.

## Résumé PDF

Put your actual PDF at **`assets/resume.pdf`**. The navigation link is already set to that exact path in `index.html`, so no setting changes are needed. **The PDF isn't included**, because you'll add your own résumé. Until you do, clicking the link will show a missing file.

## Projects and other edits

In `content.js`, edit or duplicate the objects in the `projects` array. Each one has `slug`, `title`, `year`, `summary`, `details`, `tags`, `images`, and optional `links`. The first four projects appear on Home; all projects appear on Projects.

Click a project title on Home or Projects to open its dedicated page, such as `index.html#projects/tube-amplifier`. These links can be shared or refreshed directly on GitHub Pages without any server configuration. Keep each project's `slug` unique and stable. Each project page shows its own description, images, captions, tags, and links, plus an All projects link. Separate paragraphs in `details` with `\n\n`.

Home now shows only your introduction, **Now**, a short **Projects** list, and **Elsewhere** links. **Previously**, **Stack**, and **Beyond work** have been removed entirely.

To change the appearance, adjust CSS variables at the top of `styles.css`. It's permanently light mode. You can publish the folder via GitHub Pages, Netlify, or another static hosting provider; no build step needed.
