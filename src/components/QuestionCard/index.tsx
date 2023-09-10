import { Card, Row, Col, Button } from 'react-bootstrap'
import { Question, User, questionOptions } from 'types'
import { renderTimestamp } from 'utils/timeUtils'
import { Answer } from './Answer'
import { Link } from 'react-router-dom'

interface IProps {
  question: Question
  questioner: User
  selectedOption?: keyof typeof questionOptions
  showVoteCount?: boolean
}

type Props = IProps &
  (
    | { enabled: true; onVote?: (question: string, option: keyof typeof questionOptions) => void }
    | { enabled?: false; onVote?: never }
  )

export const QuestionCard = ({ question, questioner, selectedOption, enabled, onVote, showVoteCount }: Props) => {
  const calcPercentage = (selectedOption: keyof typeof questionOptions) => {
    return Math.round(
      (question[selectedOption].votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) *
        100
    )
  }

  return (
    <Card body className="h-100">
      <Row>
        <Col>
          <Card.Title>
            <h3>{enabled ? `${questioner?.name} ask` : `From ${questioner?.name}`}</h3>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{enabled ? 'Would you rather' : 'You would rather'}</Card.Subtitle>
        </Col>
        <Col xs={'auto'}>
          <span className="text-muted">{renderTimestamp(question.timestamp)}</span>
        </Col>
      </Row>
      <Row className="align-items-center text-center">
        <Col xs={12} md={3} lg="auto">
          <img
            alt="avatar"
            className="img-fluid"
            src={`https://api.dicebear.com/6.x/big-smile/svg?seed=${question.author}&size=144`}
          />
        </Col>
        <Col>
          <Row className="align-items-center text-center">
            <Col className="overlay-wrapper" xs={5}>
              <Answer option={question.optionOne} selected={selectedOption === 'optionOne'} />
            </Col>
            <Col xs={2}>
              <hr className="hr-text vert" data-content={enabled && 'OR'} />
            </Col>
            <Col xs={5}>
              <Answer option={question.optionTwo} selected={selectedOption === 'optionTwo'} />
            </Col>
          </Row>
          {showVoteCount ? (
            <Row>
              <Col xs={5}>
                <Button variant="outline-primary" className="w-100">
                  {question.optionOne.votes.length} Vote(s) ({calcPercentage('optionOne')}%)
                </Button>
              </Col>
              <Col xs={{ span: 5, offset: 2 }}>
                <Button variant="outline-primary" className="w-100">
                  {question.optionTwo.votes.length} Vote(s) ({calcPercentage('optionTwo')}%)
                </Button>
              </Col>
            </Row>
          ) : enabled ? (
            <Row>
              <Col xs={5}>
                <Button className="w-100" onClick={() => onVote(question.id, 'optionOne')}>
                  Vote
                </Button>
              </Col>
              <Col xs={{ span: 5, offset: 2 }}>
                <Button className="w-100" onClick={() => onVote(question.id, 'optionTwo')}>
                  Vote
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <Link to={`/questions/${question.id}`}>
                  <Button className="w-100">View detail</Button>
                </Link>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Card>
  )
}
