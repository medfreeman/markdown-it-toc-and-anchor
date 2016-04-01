import markdownIt from "markdown-it"
import markdownItTocAndAnchor from "../../../src"

export default (md, options = {}) => {
  const mdIt = markdownIt({
    html: true,
    linkify: true,
    typography: true,
  })
    .use(markdownItTocAndAnchor, {

      // disable main features
      // make tests easier to write
      toc: false,
      anchorLink: false,

      ...options,
    })

  const mdRender = []
  if (typeof md === "string") {
    return mdIt.render(md)
  }
  else if (md.constructor === Array) {
    for (const s of md) {
      mdRender.push(mdIt.render(s))
    }
    return mdRender
  }
}
