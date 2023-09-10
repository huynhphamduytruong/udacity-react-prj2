import styled from 'styled-components'

export const GenericErrorTitle = styled.h1`
  font-size: 180px;
  font-weight: 200;
  margin: 0px;
  background: linear-gradient(130deg, #ffa34f, #ff6f68);
  color: transparent;
  -webkit-background-clip: text;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 140px;
  }
  @media screen and (max-width: 576px) {
    font-size: 100px;
  }
  @media screen and (max-width: 280px) {
    font-size: 80px;
  }
`
export const GenericErrorSubtitle = styled.h2`
  font-weight: 200;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 3rem;
  letter-spacing: 0.3rem;
`

export const GenericErrorTitleContainer = styled.div``

export const GenericErrorContainer = styled.div.attrs(({ className }) => ({
  className: 'justify-contents-center d-flex flex-column justify-content-center align-items-center ' + (className ?? '')
}))`
  * {
    text-align: center;
  }

  p {
    font-size: 20px;
    font-weight: 200;
    margin-bottom: 5rem;
  }

  a {
    color: #ff6f68;
    font-weight: 200;
    text-decoration: none;
    border-bottom: 1px dashed #ff6f68;
    border-radius: 2px;
  }
`
