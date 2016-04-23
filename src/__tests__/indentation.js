import test from "ava"
import mdIt from "./utils/md-it"

test("markdown-it-toc-and-anchor option: indentation", (t) => {
  t.is(
    mdIt(
      `@[toc]
# Heading 1
`,
      {
        toc: true,
        indentation: "",
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
<li>
<a href="#heading-1">Heading 1</a>
</li>
</ul>
</p>
<h1 id="heading-1">Heading 1</h1>\n`,
    "should work with no indentation"
  )
})
