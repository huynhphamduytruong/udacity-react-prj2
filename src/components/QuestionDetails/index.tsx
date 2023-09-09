import { useAppDispatch, useAppSelector } from 'app/hooks'
import { QuestionCard } from 'components/QuestionCard'
import { authSelector } from 'features/Auth/authSlice'
import { getUsers, usersSelector } from 'features/User/userSlice'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import { Question } from 'types'

export const QuestionDetails = () => {
  const question = useLoaderData() as Question

  const usersStore = useAppSelector(usersSelector)
  const authStore = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { loading, users } = usersStore
  const { user } = authStore

  if (loading) return <Spinner />

  return (
    <QuestionCard
      question={question}
      questioner={users.find((u) => u.id === question.author)}
      selectedOption={users.find((u) => u.id === user.id)?.answers?.[question.id]}
      showVoteCount
    />
  )
}
