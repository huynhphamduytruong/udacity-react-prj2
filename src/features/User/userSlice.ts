import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetUsers } from 'utils/apis/appApi'
import { User } from 'types'
import { saveAnswer } from 'features/Poll/pollSlice'
import { RootState } from 'app/store'

export const getUsers = createAsyncThunk('users/get', async () => {
  return await GetUsers()
})

interface UserState {
  loading: boolean
  users: User[]
}

export const UsersInitialState: UserState = {
  loading: true,
  users: []
}

export const userSlice = createSlice({
  name: 'users',
  initialState: UsersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true
        state.users = []
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(saveAnswer.fulfilled, (state, action) => {
        const { author, questionId, option } = action.meta.arg

        const user = state.users.slice().find((u) => u.id === author)
        user.answers[questionId] = option

        state.users = [...state.users.filter((u) => u.id !== author), { ...user }]
        state.loading = false
      })
  }
})

export const usersSelector = (state: RootState): UserState => state.users

export default userSlice.reducer
