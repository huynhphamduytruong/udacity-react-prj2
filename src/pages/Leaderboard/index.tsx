import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getUsers, usersSelector } from 'features/User/userSlice'
import { useEffect } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { User } from 'types'

export const Leaderboard = () => {
  const usersStore = useAppSelector(usersSelector)

  const { loading: usersLoading, users } = usersStore

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getUsers())
  }, [])

  // Sum both the number of questions and answers and use the sum to compare with other
  const sortLeaderboard = (u1: User, u2: User) =>
    Object.keys(u2.answers).length + u2.questions.length - Object.keys(u1.answers).length - u1.questions.length

  if (usersLoading) return <Spinner />

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {users
          ?.slice()
          .sort(sortLeaderboard)
          .map((u, idx) => (
            <tr key={idx}>
              <td>{++idx}</td>
              <td>
                <div>
                  {u.name} <span className="text-muted">({u.id})</span>
                </div>
              </td>
              <td>{Object.keys(u.answers).length}</td>
              <td>{u.questions.length}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}
