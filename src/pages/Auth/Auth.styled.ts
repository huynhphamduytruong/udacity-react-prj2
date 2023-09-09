import { Container } from 'react-bootstrap'
import { keyframes, styled } from 'styled-components'

export const StyledAuthPage = styled.section.attrs(({ className }) => ({
  className: `min-vh-100 d-flex justify-content-center align-items-center py-3 ${className ?? ''}`.trim()
}))`
  /* fallback for old browsers */
  background: #a6c0fe;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(166, 192, 254, 0.5), rgba(246, 128, 132, 0.5));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(166, 192, 254, 0.5), rgba(246, 128, 132, 0.5));
`

const beatingKeyframes = keyframes`
  0% {
    scale: 1;
  }

  50% {
    scale: 1.3;
  }

  100% {
    scale: 1;
  }
`

export const StyledAuthContainer = styled(Container)`
  & > div > .card-body {
    min-height: 38rem;
  }

  .footer {
    color: #424242;
  }

  .beating {
    animation: ${beatingKeyframes} 0.5s ease-in-out infinite forwards;
  }
`
