import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddQuestion } from 'pages/AddQuestion'
import Layout from 'pages/Shared/Layout'
import { renderWithProvider } from 'test-utils/render'

describe('AddQuestion page', () => {
  const preloadedState = {
    auth: { isAuthenticated: true, user: { id: ':id:', name: ':name:', avatarURL: ':avatarURL:' } }
  }

  test('should match snapshot', () => {
    const { container } = renderWithProvider(
      <Layout>
        <AddQuestion />
      </Layout>,
      { preloadedState }
    )

    expect(container).toMatchSnapshot()
  })

  test('should enable the submit button when both inputs have value', async () => {
    renderWithProvider(
      <Layout>
        <AddQuestion />
      </Layout>,
      { preloadedState }
    )

    const user = userEvent.setup()

    const inputOne = screen.getByTestId('option1')
    const inputTwo = screen.getByTestId('option2')
    const submitButton = screen.getByTestId('submit-btn')

    expect(submitButton).toHaveAttribute('disabled')

    await user.type(inputOne, 'first value')
    await user.type(inputTwo, 'second value')

    expect(submitButton).not.toHaveAttribute('disabled')
  })
})
