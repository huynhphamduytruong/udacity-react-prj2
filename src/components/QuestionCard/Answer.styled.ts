import styled from 'styled-components'

export const AnswerContent = styled.div``

export const AnswerContainer = styled.div.attrs(({ className }) => ({
  className: `answer ${className ?? ''}`.trim()
}))`
  position: relative;

  .overlay-image {
    opacity: 0.25;
  }

  ${AnswerContent} {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`
