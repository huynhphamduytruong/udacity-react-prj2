import styled from 'styled-components'

export const StyledAppMenu = styled.header.attrs(({ className }) => ({
  className: `fixed-top bg-body-tertiary mb-2 ${className ?? ''}`.trim()
}))`
  .home-link {
    /* color: #a49c91;
    background: -webkit-linear-gradient(45deg, #a49c91 0%, #fcdd7d 25%, #d35429 50%, #2ed8c6 75%); */
    color: #5b4c49;
    background-image: -webkit-linear-gradient(0deg, #5b4c49 0%, #eb36b1 40%, #5a54b1 70%);
    background-clip: text;
    -webkit-background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;

    /* font-size: 2rem; */
    background-position: 0% 0%;

    transition: 0.5s;

    &:hover {
      background-position: 100% 100%;
    }
  }
`
