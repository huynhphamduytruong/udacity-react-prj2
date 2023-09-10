import { useAppDispatch, useAppSelector } from 'app/hooks'
import { QuestionCard } from 'components/QuestionCard'
import { authSelector } from 'features/Auth/authSlice'
import { getUsers, usersSelector } from 'features/User/userSlice'
import { GenericErrorPage } from 'pages/Shared/Error/GenericError'
import { useEffect, useState } from 'react'
import { Spinner, Row, Toast, ToastContainer } from 'react-bootstrap'
import { GiVote } from 'react-icons/gi'
import { useLoaderData, useLocation } from 'react-router-dom'
import { Question } from 'types'

export const QuestionDetails = () => {
  const [showToast, setShowToast] = useState(false)

  const location = useLocation()
  const question = useLoaderData() as Question

  const usersStore = useAppSelector(usersSelector)
  const authStore = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getUsers())

    setShowToast(location.state?.fromVoting ?? false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { loading, users } = usersStore
  const { user } = authStore

  if (loading) return <Spinner />

  if (!question)
    return (
      <Row className="h-100">
        <GenericErrorPage error={{ message: 'Question not found' }} />
      </Row>
    )

  return (
    <>
      <ToastContainer className="p-3" position={'top-end'} style={{ zIndex: 999, marginTop: '70px' }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header closeButton={true}>
            <GiVote className="me-2" />
            <strong className="me-auto">Vote</strong>
          </Toast.Header>
          <Toast.Body>Vote successfully</Toast.Body>
        </Toast>
      </ToastContainer>

      <QuestionCard
        question={question}
        questioner={users.find((u) => u.id === question.author)}
        selectedOption={users.find((u) => u.id === user.id)?.answers?.[question.id]}
        showVoteCount
      />
    </>
  )
}
