import { useEffect, useState, useMemo } from 'react'
import { Badge, Tabs, Tab, Col, Row, Spinner, Toast, ToastContainer } from 'react-bootstrap'
import { GiVote } from 'react-icons/gi'

import { QuestionContainer } from './Home.styled'
import { QuestionCard } from 'components/QuestionCard'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getPolls, pollsSelector, saveAnswer } from 'features/Poll/pollSlice'
import { authSelector } from 'features/Auth/authSlice'
import { getUsers, usersSelector } from 'features/User/userSlice'

export const HomePage = () => {
  const usersStore = useAppSelector(usersSelector)
  const pollsStore = useAppSelector(pollsSelector)
  const authStore = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  const { loading: pollsLoading, polls } = pollsStore
  const { loading: usersLoading, users } = usersStore
  const { user } = authStore

  const [showToast, setShowToast] = useState(false)

  const ansPolls = useMemo(
    () => polls.filter((p) => Object.keys(users.find((u) => u.id === user.id)?.answers ?? {}).some((a) => a === p.id)),
    [polls, user.id, users]
  )
  const unansPolls = useMemo(() => polls.filter((p) => !ansPolls.includes(p)), [polls, ansPolls])

  useEffect(() => {
    void dispatch(getPolls())
    void dispatch(getUsers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleVoting = async (qid, option) => {
    void dispatch(saveAnswer({ author: user.id, questionId: qid, option: option })).then(() => {
      setShowToast(true)
    })
  }

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

      {pollsLoading || usersLoading ? (
        <Spinner />
      ) : (
        <Tabs defaultActiveKey="unansw">
          <Tab
            eventKey="unansw"
            title={
              <span className="text-primary">
                Unanswered Questions <Badge bg="primary">{unansPolls.length}</Badge>
              </span>
            }
          >
            <QuestionContainer>
              <Row md={1} lg={2} className="g-3">
                {unansPolls.map((x, idx) => (
                  <Col md={12} lg={6} key={idx}>
                    <QuestionCard
                      question={x}
                      questioner={users.find((u) => u.id === x.author)}
                      enabled
                      onVote={handleVoting}
                    />
                  </Col>
                ))}
              </Row>
            </QuestionContainer>
          </Tab>
          <Tab
            eventKey="answ"
            title={
              <span className="text-success">
                Answered Questions <Badge bg="success">{ansPolls.length}</Badge>
              </span>
            }
          >
            <QuestionContainer>
              <Row md={1} lg={2} className="g-3">
                {ansPolls.map((x, idx) => (
                  <Col md={12} lg={6} key={idx}>
                    <QuestionCard
                      question={x}
                      questioner={users.find((u) => u.id === x.author)}
                      selectedOption={users.find((u) => u.id === user.id)?.answers?.[x.id]}
                    />
                  </Col>
                ))}
              </Row>
            </QuestionContainer>
          </Tab>
        </Tabs>
      )}
    </>
  )
}
