import React from 'react'

import { Container } from './styles'
import Card from './card'

const PostsList = ({ postsRemark, seriesPartsRemark }) => {
  const posts = postsRemark.edges.map(e => e.node)
  const seriesPartsSlugs = seriesPartsRemark.edges.map(e => e.node.fields.slug)

  return (
    <Container>
      {posts.map(p => {
        const [path] = p.fields.slug.split('/').reverse()
        const parts = seriesPartsSlugs.filter(s => s.includes(path)).length

        return (
          <Card
            parts={parts > 0 && parts}
            image={p.frontmatter.featuredImage.childImageSharp.fluid}
            key={p.frontmatter.title}
            date={p.frontmatter.date}
            title={p.frontmatter.title}
            keywords={p.frontmatter.keywords}
            slug={p.fields.slug}
          />
        )
      })}
    </Container>
  )
}

export default PostsList