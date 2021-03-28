import styled, { css } from 'styled-components'

export const WIDTH = 680

export const Container = styled.article`
  width: ${WIDTH}px;
  margin-bottom: 40px;
  align-self: center;
  @media(max-width: ${WIDTH + 20}px) {
    width: 96vw;
  }
`

const prismStyleVSCode = css`
  pre[class*="language-"],
  code[class*="language-"] {
    border-radius: 5px;
    color: #d4d4d4;
    font-size: 16px;
    text-shadow: none;
    font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*="language-"]::selection,
  code[class*="language-"]::selection,
  pre[class*="language-"] *::selection,
  code[class*="language-"] *::selection {
    text-shadow: none;
    background: #75a7ca;
  }

  @media print {
    pre[class*="language-"],
    code[class*="language-"] {
      text-shadow: none;
    }
  }

  pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    background: var(--background-light-color);
  }

  :not(pre) > code[class*="language-"] {
    padding: .1em .3em;
    border-radius: .3em;
    color: #db4c69;
    background: #f9f2f4;
  }
  /*********************************************************
  * Tokens
  */
  .namespace {
    opacity: .7;
  }

  .token.doctype .token.doctype-tag {
    color: #569CD6;
  }

  .token.doctype .token.name {
    color: #9cdcfe;
  }

  .token.comment,
  .token.prolog {
    color: #6a9955;
  }

  .token.punctuation,
  .language-html .language-css .token.punctuation,
  .language-html .language-javascript .token.punctuation {
    color: #d4d4d4;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted,
  .token.unit {
    color: #b5cea8;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #ce9178;
  }

  .language-css .token.string.url {
    text-decoration: underline;
  }

  .token.operator,
  .token.entity {
    color: #d4d4d4;
  }

  .token.operator.arrow {
    color: #569CD6;
  }

  .token.atrule {
    color: #ce9178;
  }

  .token.atrule .token.rule {
    color: #c586c0;
  }

  .token.atrule .token.url {
    color: #9cdcfe;
  }

  .token.atrule .token.url .token.function {
    color: #dcdcaa;
  }

  .token.atrule .token.url .token.punctuation {
    color: #d4d4d4;
  }

  .token.keyword {
    color: #569CD6;
  }

  .token.keyword.module,
  .token.keyword.control-flow {
    color: #c586c0;
  }

  .token.function,
  .token.function .token.maybe-class-name {
    color: #dcdcaa;
  }

  .token.regex {
    color: #d16969;
  }

  .token.important {
    color: #569cd6;
  }

  .token.italic {
    font-style: italic;
  }

  .token.constant {
    color: #9cdcfe;
  }

  .token.class-name,
  .token.maybe-class-name {
    color: #4ec9b0;
  }

  .token.console {
    color: #9cdcfe;
  }

  .token.parameter {
    color: #9cdcfe;
  }

  .token.interpolation {
    color: #9cdcfe;
  }

  .token.punctuation.interpolation-punctuation {
    color: #569cd6;
  }

  .token.boolean {
    color: #569cd6;
  }

  .token.property,
  .token.variable,
  .token.imports .token.maybe-class-name,
  .token.exports .token.maybe-class-name {
    color: #9cdcfe;
  }

  .token.selector {
    color: #d7ba7d;
  }

  .token.escape {
    color: #d7ba7d;
  }

  .token.tag {
    color: #569cd6;
  }

  .token.tag .token.punctuation {
    color: #808080;
  }

  .token.cdata {
    color: #808080;
  }

  .token.attr-name {
    color: #9cdcfe;
  }

  .token.attr-value,
  .token.attr-value .token.punctuation {
    color: #ce9178;
  }

  .token.attr-value .token.punctuation.attr-equals {
    color: #d4d4d4;
  }

  .token.entity {
    color: #569cd6;
  }

  .token.namespace {
    color: #4ec9b0;
  }
  /*********************************************************
  * Language Specific
  */

  pre[class*="language-javascript"],
  code[class*="language-javascript"],
  pre[class*="language-jsx"],
  code[class*="language-jsx"],
  pre[class*="language-typescript"],
  code[class*="language-typescript"],
  pre[class*="language-tsx"],
  code[class*="language-tsx"] {
    color: #9cdcfe;
  }

  pre[class*="language-css"],
  code[class*="language-css"] {
    color: #ce9178;
  }

  pre[class*="language-html"],
  code[class*="language-html"] {
    color: #d4d4d4;
  }

  .language-regex .token.anchor {
    color: #dcdcaa;
  }

  .language-html .token.punctuation {
    color: #808080;
  }
  /*********************************************************
  * Line highlighting
  */
  pre[data-line] {
    position: relative;
  }

  pre[class*="language-"] > code[class*="language-"] {
    position: relative;
    z-index: 1;
  }

  .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    padding: inherit 0;
    margin-top: 1em;
    background: #f7ebc6;
    box-shadow: inset 5px 0 0 #f7d87c;
    z-index: 0;
    pointer-events: none;
    line-height: inherit;
    white-space: pre;
  }

`

const codeTitleStyle = css`
  .gatsby-code-title {
    margin-top: 10px;
    background-color: var(--background-light-color);
    margin-bottom: -0.4rem;
    padding: 0.5em 1em;
    border-radius: 5px 5px 0 0;
    font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;
    color: #d4d4d4;
    z-index: 0;
    width: fit-content;
  }
`

export const Content = styled.section`
  margin-top: 20px;
  color: var(--text-color);

  h2, h3, h4 {
    color: var(--primary-color);
  }
  h2 {
    font-size: 34px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 30px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h4 {
    margin-top: 24px;
    font-size: 24px;
  }

  strong {
    font-weight: 600;
  }

  img {
    max-width: 100%;
  }

  ${prismStyleVSCode};
  ${codeTitleStyle};

  a {
    color: var(--text-color);
    font-weight: bold;
    border-bottom-color: var(--primary-second-color) !important;
    transition: var(--default-transition);
    :hover {
      color: var(--primary-second-color);
    }
  }

  blockquote {
    margin: 36px 0 18px 0;
    color: var(--text-light-color);
    font-size: 22px;
  }

  p, li {
    margin-top: 18px;
    font-size: 18px;
    line-height: 32px;
  }

  figcaption {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: -20px;
    justify-content: center;
  }

  figure:first-of-type + p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin: 10px;
      font-weight: bold;
    }
  }

  a {
    /* text-decoration: none; */
    color: var(--text-color);
    transition: var(--default-transition);
    border-bottom: var(--text-color);
    :hover {
      color: var(--primary-color);
      border-color: var(--primary-color);
    }
  }

  .gatsby-resp-image-wrapper {
    margin-bottom: 40px;
  }

  .gatsby-resp-image-figcaption {
    text-align: center;
    color: var(--text-light-color) !important;
  }
`

export const HeadlineContainer = styled.div`
  margin: 40px 0 20px 0;
`
