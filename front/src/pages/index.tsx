import React from "react"

import SEO from '../components/seo'
import Layout from '../components/layout'
import Author from '../components/author'
import Projects from '../components/projects'
import Content from '../components/content'

const IndexPage = () => {
  return (
    <Layout>
      <SEO/>
      <Author/>
      <Projects/>
      <Content/>
    </Layout>
  )
}

export default IndexPage