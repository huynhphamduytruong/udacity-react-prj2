import pollReducer, { PollInitialState, store } from 'features/Poll/pollSlice'

describe('poll feature', () => {
  test('should handle initial state', () => {
    expect(pollReducer(undefined, { type: 'unknown' })).toEqual(PollInitialState)
  })

  test('should store new question', () => {
    const poll = {
      id: ':id:',
      author: ':author:',
      timestamp: 0,
      optionOne: {
        votes: [],
        text: ':optionOne.text:'
      },
      optionTwo: {
        votes: [],
        text: ':optionTwo.text:'
      }
    }

    const pollState = pollReducer(PollInitialState, store(poll))

    expect(pollState.polls).toContain(poll)
  })
})
