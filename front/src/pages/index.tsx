import React from "react"

import SEO from '../components/seo'
import Layout from '../components/layout'
import Author from '../components/author'
import Projects from '../components/projects'

const IndexPage = () => {
  return (
    <Layout>
      <SEO/>
      <Author/>
      <Projects/>
    </Layout>
  )
}

export default IndexPage