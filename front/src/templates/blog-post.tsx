import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Text from '../components/text'

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO/>
      <Text tag='h1'>
        {post.frontmatter.title}
      </Text>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export default BlogPost