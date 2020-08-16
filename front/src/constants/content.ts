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
  [SourceType.YOUTUBE]: 'https://youtu.be/',
  [SourceType.UDEMY]: 'https://www.udemy.com/course/',
  [SourceType.GITHUB]: 'https://github.com/RodionChachura/'
}

const getSource = (type: SourceType, uniqUrlPart: string): Source => ({
  link: `${URL_BASE[type]}${uniqUrlPart}`,
  type
})

export interface Series {
  finishDate: number,
  name: string,
  sources: Source[],
  id: string
}

export const SERIES: Series[] = [
  {
    finishDate: 1581282000,
    name: 'Snake Game With Rust, JavaScript, and WebAssembly',
    id: 'snake-game-rust',
    sources: [
      getSource(SourceType.UDEMY, 'snake-game-with-rust-javascript-and-webassembly'),
      getSource(SourceType.MEDIUM, 'snake-game-with-rust-javascript-and-webassembly-5e22b357ec7b'),
      getSource(SourceType.GITHUB, 'rust-js-snake-game')
    ]
  },
  {
    finishDate: 1566162000,
    name: 'Snake Game with JavaScript',
    id: 'snake-game-js',
    sources: [
      getSource(SourceType.YOUTUBE, 'XmfgMWVTe5Y'),
      getSource(SourceType.MEDIUM, 'snake-game-with-javascript-10e0ad9edb52'),
      getSource(SourceType.GITHUB, 'snake-game')
    ]
  },
  {
    finishDate: 1562274000,
    name: 'Breakout Game with JavaScript, React and SVG',
    id: 'breakout-game-react',
    sources: [
      getSource(SourceType.YOUTUBE, 'eweZqMnIABQ'),
      getSource(SourceType.MEDIUM, 'breakout-game-with-javascript-react-and-svg-c8c62a3d30c6'),
      getSource(SourceType.GITHUB, 'breakout-game')
    ]
  },
  {
    finishDate: 1561150800,
    name: 'Increaser Mindset',
    id: 'increaser-mindset',
    sources: [
      getSource(SourceType.MEDIUM, 'increaser-mindset-dc828a2bcd4d'),
    ]
  },
  {
    finishDate: 1558904400,
    name: 'Linear Algebra with JavaScript',
    id: 'linear-algebra-js',
    sources: [
      getSource(SourceType.MEDIUM, 'linear-algebra-with-javascript-46c289178c0'),
      getSource(SourceType.GITHUB, 'linear-algebra')
    ]
  },
  {
    finishDate: 1554670800,
    name: 'Optimization and Operations Research for Programmers',
    id: 'optimization-and-operations-research',
    sources: [
      getSource(SourceType.MEDIUM, 'course-optimization-for-programmers-5316572ed69b'),
      getSource(SourceType.GITHUB, 'optimization')
    ]
  },
  {
    finishDate: 1533243600,
    name: 'Terraform and AWS for Website Hosting',
    id: 'deploy-spa-terraform',
    sources: [
      getSource(SourceType.UDEMY, 'terraform-and-aws-for-website-hosting/'),
      getSource(SourceType.MEDIUM, 'deploying-spa-on-aws-with-terraform-358ba2aeaf9b'),
      getSource(SourceType.GITHUB, 'geekrodion.com')
    ]
  },
  {
    finishDate: 1546376400,
    name: 'Bar Chart with React',
    id: 'bar-chart-react',
    sources: [
      getSource(SourceType.YOUTUBE, 'playlist?list=PLydcsPcXRjeyJuYLRzFzSXZp-tOG98vBF'),
      getSource(SourceType.MEDIUM, 'bar-chart-with-react-3b20b7907633'),
      getSource(SourceType.GITHUB, 'increaser-charts')
    ]
  },
  {
    finishDate: 1541970000,
    name: 'Blog with ASP.NET Core and React/Redux',
    id: 'blog-asp-react',
    sources: [
      getSource(SourceType.MEDIUM, 'blog-with-asp-net-core-and-react-redux-c80857b93cb6'),
      getSource(SourceType.GITHUB, 'simple-blog-back')
    ]
  },
  {
    finishDate: 1525035600,
    name: 'Probability Theory and Statistics for Programmers',
    id: 'probability-python',
    sources: [
      getSource(SourceType.MEDIUM, 'course-probability-theory-and-statistics-for-programmers-353e20202620'),
    ]
  },
  {
    finishDate: 1524776400,
    name: 'How to Start React Project: Best Practices',
    id: 'start-react-project',
    sources: [
      getSource(SourceType.UDEMY, 'how-to-start-react-project-best-practices'),
      getSource(SourceType.MEDIUM, 'redux-saga-create-react-app-b6484f704d68'),
      getSource(SourceType.GITHUB, 'react-starter')
    ]
  }
].sort((a, b) => b.finishDate - a.finishDate)