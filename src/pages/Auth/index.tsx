import LoginLogo from 'images/LoginLogo'
import { Card, Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { StyledAuthPage, StyledAuthContainer } from './Auth.styled'

export const AuthPage = () => {
  return (
    <StyledAuthPage>
      <StyledAuthContainer>
        <Card body className="d-grid shadow-lg p-3 rounded h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col lg={6} className="d-flex justify-content-center align-items-center">
              <LoginLogo />
            </Col>
            <Col lg={6}>
              <div className="px-5 ms-xl-4">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Card>

        <div className="text-center footer mt-4">
          Coded with <p className="text-danger d-inline-block beating">&hearts;</p> by{' '}
          <a href="https://github.com/huynhphamduytruong/udacity-react-prj2">TruongHPD</a>.
        </div>
      </StyledAuthContainer>
    </StyledAuthPage>
  )
}
