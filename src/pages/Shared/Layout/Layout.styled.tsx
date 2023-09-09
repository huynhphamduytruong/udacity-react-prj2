import styled from 'styled-components'

export const StyledLayout = styled.div.attrs(({ className }) => ({
  className: `vh-100 ${className ?? ''}`.trim()
}))`
  main > .container {
    padding: 75px 0;
  }
`
