import React from 'react'

import { Container } from './styles'
import Card from './card'

const PostsList = ({ edges }) => {
  const posts = edges.map(e => e.node)

  return (
    <Container>
      {posts.map(p => (
        <Card
          image={p.frontmatter.featuredImage.childImageSharp.fluid}
          key={p.frontmatter.title}
          date={p.frontmatter.date}
          title={p.frontmatter.title}
          keywords={p.frontmatter.keywords}
          slug={p.fields.slug}
        />
      ))}
    </Container>
  )
}

export default PostsList