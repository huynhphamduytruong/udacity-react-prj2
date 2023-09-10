import '@testing-library/jest-dom/extend-expect'
import { screen, fireEvent } from '@testing-library/react'
import { AddQuestion } from 'pages/AddQuestion'
import Layout from 'pages/Shared/Layout'
import { act } from 'react-dom/test-utils'
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

    const inputOne = screen.getByTestId('option1')
    const inputTwo = screen.getByTestId('option2')
    const submitButton = screen.getByTestId('submit-btn')

    expect(submitButton).toHaveAttribute('disabled')

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await fireEvent.change(inputOne, { target: { value: 'first value' } })

      await fireEvent.change(inputTwo, { target: { value: 'second value' } })
    })

    expect(submitButton).not.toHaveAttribute('disabled')
  })
})
