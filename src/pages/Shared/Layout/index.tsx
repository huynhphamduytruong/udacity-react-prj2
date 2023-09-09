import { Container } from 'react-bootstrap'
import { StyledLayout } from './Layout.styled'

import AppMenu from 'components/AppMenu'
import { AppFooter } from 'components/AppFooter'
import { PropsWithChildren } from 'react'

export type ILayoutProps = PropsWithChildren<unknown>

const Layout = ({ children }: ILayoutProps) => {
  return (
    <StyledLayout className="d-flex flex-column">
      <AppMenu />
      <main className="flex-shrink-0">
        <Container>{children}</Container>
      </main>
      <AppFooter />
    </StyledLayout>
  )
}

export const PublicLayout = ({ children }: ILayoutProps) => {
  return <StyledLayout>{children}</StyledLayout>
}

export default Layout
