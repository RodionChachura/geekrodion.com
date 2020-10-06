import styled from 'styled-components'

export const Container = styled.article`
  max-width: 680px;
  margin-bottom: 40px;
`

export const Content = styled.section`
  color: ${p => p.theme.color.text};

  h2, h3, h4 {
    color: ${p => p.theme.blog.color.headline};
  }
  h2 {
    font-size: 34px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 30px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h4 {
    margin-top: 24px;
    font-size: 24px;
  }

  strong {
    font-weight: 600;
  }
  
  a {
    color: ${p => p.theme.color.text};
    font-weight: bold;
    border-bottom-color: ${p => p.theme.blog.color.link} !important;
    transition: ${p => p.theme.transition.default};
    :hover {
      color: ${p => p.theme.blog.color.link};
    }
  }


  p, li {
    margin-top: 18px;
    font-size: 18px;
    line-height: 32px;
  }

  figcaption {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: -20px;
    justify-content: center;
  }

  figure:first-of-type + p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin: 10px;
      font-weight: bold;
    }
  }

  a {
    text-decoration: none;
    color: ${p => p.theme.color.primaryFont};
    transition: ${p => p.theme.transition.default};
    border-bottom: 2px solid ${p => p.theme.color.primaryFont};
    :hover {
      color: ${p => p.theme.color.actionFont};
      border-color: ${p => p.theme.color.actionFont};
    }
  }

  .gatsby-resp-image-wrapper {
    margin-bottom: 40px;
  }
`

export const HeadlineContainer = styled.div`
  margin: 40px 0 20px 0;
`