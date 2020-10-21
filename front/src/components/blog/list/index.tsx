import React from 'react'

import { Container } from './styles'
import Card from './card'

const PostsList = ({ edges }) => {
  const posts = edges.map(e => e.node)

  const onlyRootPosts = posts.filter(p => p.fields.slug.split('/').length === 3)

  return (
    <Container>
      {onlyRootPosts.map(p => (
        <Card
          parts={p.frontmatter.parts}
          image={p.frontmatter.featuredImage.childImageSharp.fluid}
          key={p.frontmatter.headline}
          date={p.frontmatter.date}
          title={p.frontmatter.headline}
          keywords={p.frontmatter.keywords}
          slug={p.fields.slug}
        />
      ))}
    </Container>
  )
}

export default PostsList