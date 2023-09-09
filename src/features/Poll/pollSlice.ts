import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Question, questionOptions } from 'types'
import { GetQuestions, SaveQuestion, VoteQuestion } from 'utils/apis/appApi'

export const getPolls = createAsyncThunk('polls/get', async () => {
  return await GetQuestions()
})

export const saveAnswer = createAsyncThunk(
  'polls/saveAnswer',
  async (payload: { author: string; questionId: string; option: keyof typeof questionOptions }, thunkAPI) => {
    return await VoteQuestion(payload.author, payload.questionId, payload.option)
  }
)

export const saveQuestion = createAsyncThunk(
  'polls/saveQuestion',
  async (payload: { author: string; options: Record<keyof typeof questionOptions, string> }, thunkAPI) => {
    return await SaveQuestion(payload.author, payload.options)
  }
)

interface PollState {
  loading: boolean
  polls?: Question[]
}

export const PollInitialState: PollState = {
  loading: true,
  polls: []
}

export const pollSlice = createSlice({
  name: 'polls',
  initialState: PollInitialState,
  reducers: {
    store: (state: PollState, action: PayloadAction<Question>) => ({
      ...state,
      polls: [...state.polls, action.payload]
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPolls.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getPolls.fulfilled, (state, action) => {
        state.loading = false
        state.polls = action.payload
      })
      .addCase(saveAnswer.pending, (state, action) => {
        state.loading = true
      })
      .addCase(saveAnswer.fulfilled, (state, action) => {
        const payload = action.meta.arg

        const poll = state.polls.slice().find((p) => p.id === payload.questionId)
        poll[payload.option].votes = [...poll[payload.option].votes, payload.author]

        state.polls = [...state.polls.filter((p) => p.id !== payload.questionId), { ...poll }]
        state.loading = false
      })
      .addCase(saveQuestion.pending, (state, action) => {
        state.loading = true
      })
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state.polls = [...state.polls, action.payload]
        state.loading = false
      })
  }
})

export const pollsSelector = (state: RootState): PollState => state.polls

export default pollSlice.reducer
export const { store } = pollSlice.actions
