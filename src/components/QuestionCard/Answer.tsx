import { AnswerOption } from 'types'
import { AnswerContainer, AnswerContent } from './Answer.styled'

import CheckIcon from 'images/CheckIcon'

interface IProps {
  option: AnswerOption
  selected?: boolean
}

export const Answer = ({ option, selected }: IProps) => {
  return (
    <AnswerContainer className="overlay-container selected">
      {selected && <CheckIcon className="img-fluid overlay-image" />}
      <AnswerContent className="overlay-text">
        <span className="option-text">{option.text}</span>
      </AnswerContent>
    </AnswerContainer>
  )
}
