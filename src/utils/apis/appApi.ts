import { Question, User, questionOptions } from 'types'
import { users, questions, _saveQuestion, _saveQuestionAnswer } from 'utils/_DATA'
import { randomIntRange } from 'utils/randomUtils'

export const GetUsers = async () => {
  return new Promise<User[]>((resolve) => {
    setTimeout(
      () => {
        resolve(Object.values(users).map((x) => x as User))
      },
      randomIntRange(300, 500)
    )
  })
}

export const GetQuestions = async () => {
  return new Promise<Question[]>((resolve) => {
    setTimeout(
      () => {
        resolve(Object.values(questions))
      },
      randomIntRange(300, 500)
    )
  })
}
export const VoteQuestion = async (userId: string, questionId: string, answer: keyof typeof questionOptions) => {
  return _saveQuestionAnswer({ authedUser: userId, qid: questionId, answer: answer })
}

export const SaveQuestion = async (userId: string, options: Record<keyof typeof questionOptions, string>) => {
  return _saveQuestion({ optionOneText: options['optionOne'], optionTwoText: options['optionTwo'], author: userId })
}
