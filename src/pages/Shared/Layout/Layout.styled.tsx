import styled from 'styled-components'
import { GenericErrorContainer } from '../Error/GenericError.styled'

export const StyledLayout = styled.div.attrs(({ className }) => ({
  className: `vh-100 ${className ?? ''}`.trim()
}))`
  main > .container {
    padding: 75px 0;

    &:has(${GenericErrorContainer}) {
      height: 100vh;
    }
  }
`
