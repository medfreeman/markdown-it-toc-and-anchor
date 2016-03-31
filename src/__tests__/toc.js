import test from "ava"
import mdIt from "./utils/md-it"

test("markdown-it-toc-and-anchor toc", (t) => {

  t.is(
    mdIt(
      "",
      { toc: true }
    ),
    ``,
    "should works with nothing"
  )

  t.is(
    mdIt(
      "@[toc]"
    ),
    `<p></p>\n`,
    "should do nothing if not asked to"
  )

  t.is(
    mdIt(
      "@[toc]",
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
</ul>
</p>\n`,
    "should works with no heading"
  )

  t.is(
    mdIt(
      "@[toc]",
      {
        toc: true,
        tocClassName: "test",
      }
    ),
    `<p>
<ul class="test">
</ul>
</p>\n`,
    "should allow custom class"
  )

  t.is(
    mdIt(
      `@[toc]
# 新年快乐`,
      {
        toc: true,
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#新年快乐">新年快乐</a>
  </li>
</ul>
</p>
<h1 id="新年快乐">新年快乐</h1>\n`,
    "should support unicode headings"
  )

  t.is(
    mdIt(
      `@[toc]
# Heading`,
      {
        toc: true,
        anchorLink: true,
        anchorClassName: "anchor",
        anchorLinkSymbol: "",
        anchorLinkSymbolClassName: "octicon octicon-link",
        anchorLinkSpace: false,
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading"><a class="anchor" href="#heading">` +
    `<span class="octicon octicon-link"></span></a>Heading</h1>\n`,
    "should support GitHub style anchor link"
  )

  t.is(
    mdIt(
      `@[toc]
# Heading
## Two
### Three
# One`,
      {
        toc: true,
        tocFirstLevel: 2,
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#two">Two</a>
    <ul>
      <li>
        <a href="#three">Three</a>
      </li>
    </ul>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>
<h2 id="two">Two</h2>
<h3 id="three">Three</h3>
<h1 id="one">One</h1>\n`,
    "should works when skipping first level"
  )

  t.is(
    mdIt(
      `@[toc]
# Heading
# Heading`,
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
  <li>
    <a href="#heading-2">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>
<h1 id="heading-2">Heading</h1>\n`,
    "should works with smiliar levels and similar titles"
  )

  t.is(
    mdIt(
      `@[toc]
# 'Heading' ?
# $.lel!
# $.lel?
`,
      { toc: true }
    ),
  `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">'Heading' ?</a>
  </li>
  <li>
    <a href="#lel">$.lel!</a>
  </li>
  <li>
    <a href="#lel-2">$.lel?</a>
  </li>
</ul>
</p>
<h1 id="heading">'Heading' ?</h1>
<h1 id="lel">$.lel!</h1>
<h1 id="lel-2">$.lel?</h1>\n`,
    "should works with special chars"
  )

  t.is(
    mdIt(
      `@[toc]
### a
# b
`,
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <ul>
      <li>
        <ul>
          <li>
            <a href="#a">a</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <a href="#b">b</a>
  </li>
</ul>
</p>
<h3 id="a">a</h3>
<h1 id="b">b</h1>\n`,
    "should works when not starting with h1"
  )

  t.is(
    mdIt(
      `@[toc]
# Heading 1
## SubHeading
# Heading 2
### Deeper Heading`,
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading-1">Heading 1</a>
    <ul>
      <li>
        <a href="#subheading">SubHeading</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="#heading-2">Heading 2</a>
    <ul>
      <li>
        <ul>
          <li>
            <a href="#deeper-heading">Deeper Heading</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</p>
<h1 id="heading-1">Heading 1</h1>
<h2 id="subheading">SubHeading</h2>
<h1 id="heading-2">Heading 2</h1>
<h3 id="deeper-heading">Deeper Heading</h3>\n`,
    "should works"
  )

  t.same(
    mdIt(
      [`# Heading`, `# Heading`, `# Heading`],
      { resetIds: true }
    ),
    [`<h1 id="heading">Heading</h1>\n`, `<h1 id="heading">Heading</h1>\n`, `<h1 id="heading">Heading</h1>\n`],
    "should return the same anchor hrefs for the same markdown headings with same names on different renderings with the same markdownIt instance when resetIds is true "
  )

  t.same(
    mdIt(
      [`# Heading`, `# Heading`, `# Heading`],
      { resetIds: false }
    ),
    [`<h1 id="heading">Heading</h1>\n`, `<h1 id="heading-2">Heading</h1>\n`, `<h1 id="heading-3">Heading</h1>\n`],
    "should return different anchor hrefs for the same markdown headings with same names on different renderings with the same markdownIt instance when resetIds is false "
  )

  t.same(
    mdIt(
      [`@[toc]
# Heading`,
       `@[toc]
# Heading`,
       `@[toc]
# Heading`],
      {
        toc: true,
        resetIds: true
      }
    ),
    [
      `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>\n`,
      `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>\n`,
      `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>\n`,
    ],
    "should return the same anchor hrefs for the same markdown headings with same names on different renderings with the same markdownIt instance when resetIds is true and toc is true"
  )

  t.same(
    mdIt(
      [`@[toc]
# Heading`,
       `@[toc]
# Heading`,
       `@[toc]
# Heading`],
      {
        toc: true,
        resetIds: false
      }
    ),
    [
      `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>\n`,
      `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading-2">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading-2">Heading</h1>\n`,
      `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading-3">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading-3">Heading</h1>\n`,
    ],
    "should return different anchor hrefs for the same markdown headings with same names on different renderings with the same markdownIt instance when resetIds is false and toc is true"
  )
})
