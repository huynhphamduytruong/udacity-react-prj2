import { RootState } from 'app/store'
import authReducer, { AuthInitialState, authSelector, login, logout } from './../Auth/authSlice'

describe('auth feature', () => {
  test('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(AuthInitialState)
  })

  test('should handle login', () => {
    const auth = authReducer(
      AuthInitialState,
      login({
        id: ':id:',
        name: ':name:',
        avatarURL: ':avatarURL:',
        answers: {},
        questions: []
      })
    )

    expect(auth.isAuthenticated).toBeTruthy()
    expect(auth.user.id).toEqual(':id:')
  })

  test('should handle logout', () => {
    const auth = authReducer(AuthInitialState, logout())

    expect(auth.user).toBeNull()
    expect(auth.isAuthenticated).toBeFalsy()
  })

  test('should be unauthenticated', () => {
    const rootState: RootState = {
      auth: AuthInitialState
    }

    const auth = authSelector(rootState)

    expect(auth.user).toBeNull()
    expect(auth.isAuthenticated).toBeFalsy()
  })
})
