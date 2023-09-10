import { useEffect, useMemo } from 'react'
import { Badge, Col, Row, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { QuestionCard } from 'components/QuestionCard'
import { authSelector } from 'features/Auth/authSlice'
import { getPolls, pollsSelector, saveAnswer } from 'features/Poll/pollSlice'
import { getUsers, usersSelector } from 'features/User/userSlice'
import { Question } from 'types'
import { QuestionContainer } from './Home.styled'

export const HomePage = () => {
  const navigate = useNavigate()

  const usersStore = useAppSelector(usersSelector)
  const pollsStore = useAppSelector(pollsSelector)
  const authStore = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  const { loading: pollsLoading, polls } = pollsStore
  const { loading: usersLoading, users } = usersStore
  const { user } = authStore

  const orderDescByTimestamp = (p1: Question, p2: Question) => p2.timestamp - p1.timestamp
  const ansPolls = useMemo(
    () =>
      polls
        .filter((p) => Object.keys(users.find((u) => u.id === user.id)?.answers ?? {}).some((a) => a === p.id))
        .sort(orderDescByTimestamp),
    [polls, user.id, users]
  )
  const unansPolls = useMemo(
    () => polls.filter((p) => !ansPolls.includes(p)).sort(orderDescByTimestamp),
    [polls, ansPolls]
  )

  useEffect(() => {
    void dispatch(getPolls())
    void dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleVoting = async (qid, option) => {
    void dispatch(saveAnswer({ author: user.id, questionId: qid, option: option })).then(() => {
      navigate(`/questions/${qid}`, { replace: true, state: { fromVoting: true } })
    })
  }

  if (pollsLoading || usersLoading) return <Spinner />

  return (
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
  )
}
