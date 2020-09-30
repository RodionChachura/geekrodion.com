import React from "react"

import SEO from '../components/seo'
import Layout from '../components/layout'
import Author from '../components/author'
import Projects from '../components/projects'
import Content from '../components/content'

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO/>
      <Author/>
      <Projects/>
      <Content/>
    </Layout>
  )
}

export default IndexPage