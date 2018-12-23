import test from "ava";

import mdIt from "./utils/md-it";

test("markdown-it-toc-and-anchor anchor", t => {
  t.is(
    mdIt(
      `@[toc]
# 'Heading' ?
# $.lel!
# $.lel?
`,
      { anchorLink: true }
    ),
    /* eslint-disable max-len */
    `<p></p>
<h1 id="heading"><a class="markdownIt-Anchor" href="#heading">#</a> 'Heading' ?</h1>
<h1 id="lel"><a class="markdownIt-Anchor" href="#lel">#</a> $.lel!</h1>
<h1 id="lel-2"><a class="markdownIt-Anchor" href="#lel-2">#</a> $.lel?</h1>\n`,
    /* eslint-enable max-len */
    "should add anchors"
  );

  t.is(
    mdIt(
      `@[toc]
# 'Heading' ?
# $.lel!
# $.lel?
`,
      {
        anchorLink: true,
        anchorLinkBefore: false
      }
    ),
    /* eslint-disable max-len */
    `<p></p>
<h1 id="heading">'Heading' ? <a class="markdownIt-Anchor" href="#heading">#</a></h1>
<h1 id="lel">$.lel! <a class="markdownIt-Anchor" href="#lel">#</a></h1>
<h1 id="lel-2">$.lel? <a class="markdownIt-Anchor" href="#lel-2">#</a></h1>\n`,
    /* eslint-enable max-len */
    "should add anchors after"
  );

  t.is(
    mdIt(
      `@[toc]
# Heading`,
      {
        anchorLink: true,
        anchorClassName: "anchor",
        anchorLinkSymbol: "",
        anchorLinkSymbolClassName: "octicon octicon-link",
        anchorLinkSpace: false
      }
    ),
    `<p></p>
<h1 id="heading"><a class="anchor" href="#heading">` +
      '<span class="octicon octicon-link"></span></a>Heading</h1>\n',
    "should support GitHub style anchor link"
  );

  t.is(
    mdIt(
      `@[toc]
# `,
      {}
    ),
    `<p></p>
<h1 id=""></h1>
`,
    "should support empty heading"
  );

  t.is(
    mdIt(
      `@[toc]
  # Heading
  `,
      {
        anchorLink: true,
        anchorClassName: null
      }
    ),
    `<p></p>
<h1 id="heading"><a href="#heading">#</a> Heading</h1>
`,
    "should handle not including default class" +
      " in anchors when setting anchorClassName to null"
  );

  t.is(
    mdIt(
      `@[toc]
# test me i'm famous`,
      {
        slugify: string => `/some/prefix/${string.replace(/(\/| |')/g, "_")}`
      }
    ),
    `<p></p>
<h1 id="/some/prefix/test_me_i_m_famous">test me i'm famous</h1>
`,
    "should support custom slugify function from readme"
  );

  t.is(
    mdIt(
      `@[toc]

# Heading`,
      {
        anchorLink: true,
        wrapHeadingTextInAnchor: true
      }
    ),
    /* eslint-disable max-len */
    `<p></p>
<h1 id="heading"><a class="markdownIt-Anchor" href="#heading">Heading</a></h1>\n`,
    /* eslint-enable max-len */
    "should support wrapping heading text in the anchor link"
  );

  t.is(
    mdIt(
      `
# Hello World
`,
      {
        anchorLink: true,
        anchorLinkPrefix: "section-"
      }
    ),
    /* eslint-disable max-len */
    `<h1 id="section-hello-world"><a class="markdownIt-Anchor" href="#section-hello-world">#</a> Hello World</h1>\n`,
    /* eslint-enable max-len */
    "should use prefix"
  );
});
