import { User } from 'types'
import { users } from 'utils/_DATA'
import { randomIntRange } from 'utils/randomUtils'

type AuthResp = Omit<User, 'password' | 'questions' | 'answers'>

export const login = async (username: string, password: string, rememberMe?: boolean): Promise<AuthResp> => {
  return new Promise<AuthResp>((resolve, reject) => {
    setTimeout(
      () => {
        const typedUsers = Object.values(users).map((x) => x as User)

        if (!typedUsers.some((u) => u.id === username && u.password === password)) {
          return reject('Invalid username or password')
        }

        const {
          password: _,
          questions,
          answers,
          ...rest
        } = typedUsers.find((u) => u.id === username && u.password === password)

        if (rememberMe) {
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(rest))
        }

        return resolve(rest)
      },
      randomIntRange(500, 1000)
    )
  })
}

export const logout = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    localStorage.removeItem('user')

    setTimeout(() => resolve(true), 250)
  })
}
