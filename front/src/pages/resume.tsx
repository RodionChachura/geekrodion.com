import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Resume from '../components/resume'

const ResumePage = () => {
  return (
    <Layout withoutNavbar>
      <SEO
        title="Rodion Chachura Resume"
      />
      <Resume/>
    </Layout>
  )
}

export default ResumePage