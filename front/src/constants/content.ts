export enum SourceType {
  MEDIUM,
  YOUTUBE,
  UDEMY,
  GITHUB
}

export interface Source {
  link: string,
  type: SourceType
}

const URL_BASE = {
  [SourceType.MEDIUM]: 'https://medium.com/@geekrodion/',
  [SourceType.YOUTUBE]: 'https://www.youtube.com/',
  [SourceType.UDEMY]: 'https://www.udemy.com/course/snake-game-with-rust-javascript-and-webassembly/',
  [SourceType.GITHUB]: 'https://github.com/RodionChachura'
}

const getSource = (type: SourceType, uniqUrlPart: string): Source => ({
  link: `${URL_BASE[type]}${uniqUrlPart}`,
  type
})

export interface Series {
  finishDate: number,
  name: string,
  sources: Source[]
}

export const SERIES: Series[] = [
  {
    finishDate: 1581282000,
    name: 'Snake Game With Rust, JavaScript, and WebAssembly',
    sources: [
      getSource(SourceType.UDEMY, 'snake-game-with-rust-javascript-and-webassembly'),
      getSource(SourceType.MEDIUM, 'snake-game-with-rust-javascript-and-webassembly-5e22b357ec7b'),
      getSource(SourceType.GITHUB, 'rust-js-snake-game')
    ]
  },
  {
    finishDate: 1566162000,
    name: 'Snake Game with JavaScript',
    sources: [
      getSource(SourceType.YOUTUBE, 'playlist?list=PLydcsPcXRjewkhbFU6wihNe6D9YfxYEoQ'),
      getSource(SourceType.MEDIUM, 'snake-game-with-javascript-10e0ad9edb52'),
      getSource(SourceType.GITHUB, 'snake-game')
    ]
  },
  {
    finishDate: 1562274000,
    name: 'Breakout Game with JavaScript, React and SVG',
    sources: [
      getSource(SourceType.YOUTUBE, 'playlist?list=PLydcsPcXRjewg798yVulQmoblrQlu46iM'),
      getSource(SourceType.MEDIUM, 'breakout-game-with-javascript-react-and-svg-c8c62a3d30c6'),
      getSource(SourceType.GITHUB, 'breakout-game')
    ]
  },
  {
    finishDate: 1561150800,
    name: 'Increaser Mindset',
    sources: [
      getSource(SourceType.MEDIUM, 'increaser-mindset-dc828a2bcd4d'),
    ]
  },
  {
    finishDate: 1558904400,
    name: 'Linear Algebra with JavaScript',
    sources: [
      getSource(SourceType.MEDIUM, 'linear-algebra-with-javascript-46c289178c0'),
      getSource(SourceType.GITHUB, 'linear-algebra')
    ]
  },
  {
    finishDate: 1554670800,
    name: 'Optimization and Operations Research for Programmers',
    sources: [
      getSource(SourceType.MEDIUM, 'course-optimization-for-programmers-5316572ed69b'),
      getSource(SourceType.GITHUB, 'optimization')
    ]
  },
  {
    finishDate: 1533243600,
    name: 'Terraform and AWS for Website Hosting',
    sources: [
      getSource(SourceType.UDEMY, 'terraform-and-aws-for-website-hosting/'),
      getSource(SourceType.MEDIUM, 'deploying-spa-on-aws-with-terraform-358ba2aeaf9b'),
      getSource(SourceType.GITHUB, 'geekrodion.com')
    ]
  },
  {
    finishDate: 1546376400,
    name: 'Bar Chart with React',
    sources: [
      getSource(SourceType.YOUTUBE, 'playlist?list=PLydcsPcXRjeyJuYLRzFzSXZp-tOG98vBF'),
      getSource(SourceType.MEDIUM, 'bar-chart-with-react-3b20b7907633'),
      getSource(SourceType.GITHUB, 'increaser-charts')
    ]
  },
  {
    finishDate: 1541970000,
    name: 'Blog with ASP.NET Core and React/Redux.',
    sources: [
      getSource(SourceType.MEDIUM, 'blog-with-asp-net-core-and-react-redux-c80857b93cb6'),
      getSource(SourceType.GITHUB, 'simple-blog-back')
    ]
  },
  {
    finishDate: 1525035600,
    name: 'Probability Theory and Statistics for Programmers',
    sources: [
      getSource(SourceType.MEDIUM, 'course-probability-theory-and-statistics-for-programmers-353e20202620'),
    ]
  },
]