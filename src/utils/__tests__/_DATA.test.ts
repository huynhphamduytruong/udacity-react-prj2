import { _saveQuestion, _saveQuestionAnswer } from '../_DATA'

describe('_saveQuestion()', () => {
  it('should be return truthy when correctly formatted data is passed to the function', async () => {
    const res = await _saveQuestion({
      author: ':author:',
      optionOneText: ':optionOneText:',
      optionTwoText: ':optionTwoText:'
    })

    expect(res).toBeTruthy()
  })

  it('should be return error when incorrect data is passed to the function', async () => {
    const res = await _saveQuestion({
      author: ':author:',
      optionOneText: null,
      optionTwoText: ':optionTwoText:'
    }).catch((error) => error)

    expect(res).toBe('Please provide optionOneText, optionTwoText, and author')
  })
})

describe('_saveQuestionAnswer()', () => {
  it('should be return truthy when correctly formatted data is passed to the function', async () => {
    const res = await _saveQuestionAnswer({
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    })

    expect(res).toBeTruthy()
  })

  it('should be return error when incorrect data is passed to the function', async () => {
    const res = await _saveQuestionAnswer({
      authedUser: 'sarahedo',
      qid: [],
      answer: null
    }).catch((error) => error)

    expect(res).toBe('Please provide authedUser, qid, and answer')
  })
})
