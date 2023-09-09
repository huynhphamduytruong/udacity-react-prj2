type Entity = {
  id: string
}

export enum questionOptions {
  optionOne,
  optionTwo
}

export type User = Entity & {
  password?: string
  name: string
  avatarURL: string
  answers: {
    [key: string]: keyof typeof questionOptions
  }
  questions: string[]
}

export type AnswerOption = {
  votes: string[]
  text: string
}

export type Question = Entity & {
  author: string
  timestamp: number
  optionOne: AnswerOption
  optionTwo: AnswerOption
}

export type ApiState<T> = {
  data?: T
  error?: any
  loading?: boolean
}
