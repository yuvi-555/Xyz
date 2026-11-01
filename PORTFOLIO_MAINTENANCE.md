# Portfolio Maintenance & Source-of-Truth Rules

**Purpose:** prevent accidental removal of established content, navigation, or personal details when maintaining Yogesh Kokane's portfolio.

## Canonical source

- Notion portfolio: https://app.notion.com/p/400e88f5786381c19822cea98e59e093
- Live website: https://yogeshkokane.vercel.app/
- Repository: https://github.com/yuvi-555/Portfolio-site

Notion is the editorial source of truth for portfolio facts and approved content. The repository is the implementation source for layout, behavior, assets, and deployed code. Keep the two aligned.

## Protected website elements

Do not remove or silently alter these unless Yogesh explicitly asks:
- Top-navigation link to the Notion portfolio.
- Hero CTA “Full portfolio on Notion”.
- Lines, Campaigns, Screen, Book, Art, Work, and Contact sections.
- Email, WhatsApp, LinkedIn, Instagram, Letterboxd, and blog contact links.
- Existing campaign examples, creative work, and artwork.
- Existing CSS/JS interactions and accessibility labels.

## Rules for editing

1. Make the smallest targeted change that accomplishes the request; avoid whole-file rewrites.
2. Before editing, read the relevant source file and the canonical Notion page/child page.
3. For career history and achievements, rely on current Notion content and evidence supplied by Yogesh (such as LinkedIn screenshots or an accessible export). Never infer dates, employment status, job titles, skills, certifications, metrics, or responsibilities.
4. If evidence conflicts, keep the conflict explicit and ask for confirmation only if it materially blocks the work. Do not silently invent a resolution.
5. When factual details change, update the corresponding Notion source page and website together. If a Notion update cannot be made, clearly record that limitation; do not claim both are synchronized.
6. Preserve all unrelated links, sections, copy, and features. “Cleanup” is not permission to remove content.
7. Keep external links and assets exactly grounded in known URLs. Do not invent replacement links or assume an image works without checking it.
8. After edits, inspect the diff and run the release checklist below before reporting completion.

## Release checklist

- [ ] Navigation contains the Notion portfolio link.
- [ ] Hero contains the “Full portfolio on Notion” link.
- [ ] Contact/social links are intact.
- [ ] Existing page sections and work examples remain present.
- [ ] Employment dates/titles and achievements match evidence.
- [ ] All modified links and assets have been checked.
- [ ] Changes are committed to the intended branch.
- [ ] Vercel deployment is READY.
- [ ] Production alias points to the intended deployment.
- [ ] Report what changed and what was not verifiable honestly.

## Incident note: October 2026

The Notion links were absent from a repository version after an edit. They have been restored in navigation and the hero CTA. This incident establishes the protected-elements rule above: never remove established links during unrelated updates.

The Experience section was also revised using user-provided LinkedIn screenshots. Treat those screenshots as evidence for the visible details only; do not assume they expose the complete profile.
