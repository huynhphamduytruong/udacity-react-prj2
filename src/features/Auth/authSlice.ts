import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as AuthApi from 'utils/apis/authApi'
import { User } from 'types'
import { RootState } from 'app/store'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const user = JSON.parse(localStorage.getItem('user') ?? 'null') as Omit<User, 'password' | 'questions' | 'answers'>

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (
    { username, password, rememberMe }: { username: string; password: string; rememberMe?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const resp = await AuthApi.login(username, password, rememberMe)
      return resp
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  return await AuthApi.logout()
})

export interface AuthState {
  isAuthenticated?: boolean
  errorMessage?: string
  user?: Omit<User, 'password' | 'questions' | 'answers'>
}

export const AuthInitialState: AuthState = {
  isAuthenticated: !!user,
  errorMessage: null,
  user
}

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    // These just for testing purposed
    login: (state: AuthState, action: PayloadAction<User>) => ({
      ...state,
      isAuthenticated: true,
      user: action.payload
    }),
    logout: (state: AuthState) => ({
      ...state,
      user: null,
      isAuthenticated: false
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isAuthenticated = false
        state.errorMessage = 'loading'
        state.user = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.errorMessage = null
        state.user = action.payload
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuthenticated = false
        state.errorMessage = action.payload as string
        state.user = null
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false
        state.errorMessage = null
        state.user = null
      })
  }
})

export const authSelector = (state: RootState): AuthState => state.auth

export const { logout, login } = authSlice.actions
export default authSlice.reducer
