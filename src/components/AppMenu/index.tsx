import { Navbar, Container, Nav, NavDropdown, Button, Dropdown } from 'react-bootstrap'
import { GiVote } from 'react-icons/gi'
import { LuLogOut } from 'react-icons/lu'

import { Link, NavLink, Navigate } from 'react-router-dom'
import { StyledAppMenu } from './AppMenu.styled'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { authSelector, logoutAsync } from 'features/Auth/authSlice'

const AppMenu = () => {
  const auth = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  if (!auth.isAuthenticated) return <Navigate to="/auth/login" replace />

  return (
    <StyledAppMenu>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/" className="home-link me-3">
            <svg width="0" height="0">
              <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="rgba(246, 128, 132, 0.9)" offset="0%" />
                <stop stopColor="rgba(166, 192, 254, 0.9)" offset="100%" />
              </linearGradient>
            </svg>
            <GiVote className="me-2" style={{ fill: 'url(#blue-gradient)', fontSize: '1.6rem' }} />
            Employee Polls
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-menu" className="justify-content-end" />
          <Navbar.Collapse id="nav-menu">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" eventKey="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/leaderboard" eventKey="/leaderboard">
                Leaderboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add" eventKey="/add">
                New Question
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              id="user-actions"
              title={
                <Button variant="none">
                  <img
                    alt={auth.user.id}
                    src={`https://api.dicebear.com/6.x/big-smile/svg?seed=${auth.user.id}&size=36`}
                    width="36"
                    height="36"
                  />{' '}
                  {auth.user.name}
                </Button>
              }
            >
              <Dropdown.Header>
                {auth.user.name} ({auth.user.id})
              </Dropdown.Header>
              <NavDropdown.Item onClick={(e) => dispatch(logoutAsync())}>
                <LuLogOut className="me-2" />
                <span>Logout</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledAppMenu>
  )
}

export default AppMenu
