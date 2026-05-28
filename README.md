# Logoi

A minimal Astro site for Markdown notes with build-time math rendering through KaTeX.

## Writing

Add notes in `src/content/notes` as Markdown files:

```md
---
title: "A Note Title"
description: "A short summary for the notes index."
tags:
    - hello
    - world
date: 2026-05-25
draft: true
---

Inline math works with $f : D \to E$.

Display math works too:

$$
f\left(\bigsqcup_i x_i\right) = \bigsqcup_i f(x_i)
$$

![Alt text.](/images/link) for images.
```

## Callouts

Use callouts in Markdown with container directives:

```md
:::callout{tone="blue" sidebar="medium" reveal}
Quote or callout text.

Attribution or supporting text.

:::quote-explanation
Text shown when the callout is hovered or clicked.
:::
:::
```

Available tones are `transparent`, `violet`, `blue`, `green`, `rose`, `amber`, `teal`, and `slate`. Omit `tone` for a transparent callout.

Sidebar thicknesses are `none`, `thin` (2px), `medium` (3px), and `thick` (7px). You can also pass an explicit CSS length, such as `sidebar="5px"`.

Other options:
- `sidebar` adds a left rule.
- `border` adds a full border.
- `reveal` swaps to a nested `quote-explanation` on hover or click.

## Local development

```sh
npm install
npm run dev
```

## AI use declaration
AI was used to generate the initial scaffold for the repository and will probably
continue to be used to generate additional pages and visual improvements (at least
until I get around to redoing the whole thing myself, which could take a very long
time). AI may be used minimally to revise the writing on occasion, and ideas contained
within the writing may be the occasional results of dialogue with AI -- nevertheless,
I, a human, will write the vast majority of the content on this website, and all the
content on this website reflects who I am as a person and my genuine interests.
