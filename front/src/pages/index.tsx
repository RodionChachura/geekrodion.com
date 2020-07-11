import React from "react"

import Layout from '../components/layout'
import AuthorPhoto from '../components/author-photo'
import AuthorAbout from '../components/author-about'

const IndexPage = () => {
  return (
    <Layout>
      <AuthorPhoto/>
      <AuthorAbout/>
    </Layout>
  )
}

export default IndexPage