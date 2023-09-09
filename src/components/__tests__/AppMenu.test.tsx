import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import AppMenu from 'components/AppMenu'
import { renderWithProvider } from 'test-utils/render'

describe('AppMenu test', () => {
  const preloadedState = {
    auth: { isAuthenticated: true, user: { id: ':id:', name: ':name:', avatarURL: ':avatarURL:' } }
  }

  test('should match snapshot', async () => {
    const { container } = renderWithProvider(<AppMenu />, { preloadedState })

    expect(container).toMatchSnapshot()
  })

  test('should render all links correctly', async () => {
    renderWithProvider(<AppMenu />, { preloadedState })

    const homeLink = screen.getByText(/home/i)
    const newPollLink = screen.getByText(/new question/i)
    const leaderboardLink = screen.getByText(/leaderboard/i)

    expect(homeLink).toBeInTheDocument()
    expect(newPollLink).toBeInTheDocument()
    expect(leaderboardLink).toBeInTheDocument()
  })
})
