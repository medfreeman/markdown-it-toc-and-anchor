# markdown-it-toc-and-anchor [![Travis Build Status](https://travis-ci.org/MoOx/markdown-it-toc-and-anchor.svg)](https://travis-ci.org/MoOx/markdown-it-toc-and-anchor)

> markdown-it plugin to add toc and anchor links in headings

## Installation

```console
$ npm install markdown-it-toc-and-anchor
```

## Usage

```js
import markdownIt from "markdown-it"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"

markdownIt({
    html: true,
    linkify: true,
    typography: true,
  })
    .use(markdownItTocAndAnchor, {
      // ...options
    })
    .render(md)
```

### Options

#### `toc`

(default: `true`)

Allow you to enable/disable the toc transformation of `@[toc]`

#### `tocClassName`

(default: `"markdownIt-TOC"`)

Option to customize html class of the `<ul>` wrapping the toc

#### `tocFirstLevel`

(default: `1`)

Allow you to skip some heading level. Example: use 2 if you want to skip `<h1>`
from the TOC.

#### `anchorLink`

(default: `true`)

Allow you to enable/disable the anchor link in the headings

#### `anchorLinkSymbol`

(default: `"#"`)

Allow you to customize the anchor link symbol

#### `anchorLinkSpace`

(default: `true`)

Allow you to enable/disable inserting a space between the anchor link and heading.

#### `anchorLinkSymbolClassName`

(default: `null`)

Allow you to customize the anchor link symbol class name. If not null, symbol will be rendered as `<span class="anchorLinkSymbolClassName">anchorLinkSymbol</span>`.

#### `anchorLinkBefore`

(default: `true`)

Allow you to prepend/append the anchor link in the headings

#### `anchorClassName`

(default: `"markdownIt-Anchor"`)

Allow you to customize the anchor link class

#### `resetIds`

(default: `true`)

Allow you to reset (or not) ids incrementation. Use it if you will have multiple
documents on the same page.

#### `indentation`

(default: `"  "`)

Allow you to customize indentation

---

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
