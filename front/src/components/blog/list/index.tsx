import React from 'react'

import { Container } from './styles'
import Card from './card'
import { splitArrayBy } from '../../../utils/generic'

const PostsList = ({ edges }) => {
  const posts = edges.map(e => e.node)

  const [rootPosts, partsOfRootPosts] = splitArrayBy(posts, post => post.fields.slug.split('/').length === 3)
  return (
    <Container>
      {rootPosts.map(p => {
        const [path] = p.fields.slug.split('/').reverse()
        const parts = partsOfRootPosts.filter(p => p.fields.slug.includes(path)).length

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