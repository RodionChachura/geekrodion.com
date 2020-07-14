import React from "react"

import SEO from '../components/seo'
import Layout from '../components/layout'
import Author from '../components/author'

const IndexPage = () => {
  return (
    <Layout>
      <SEO/>
      <Author/>
    </Layout>
  )
}

export default IndexPage