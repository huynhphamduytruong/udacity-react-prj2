import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .hr-text {
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;
    opacity: 0.5;

    &:before {
      content: '';
      // use the linear-gradient for the fading effect
      // use a solid background color for a solid bar
      background: linear-gradient(to right, transparent, #818078, transparent);
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
    }
    &:after {
      content: attr(data-content);
      position: relative;
      display: inline-block;
      color: black;

      padding: 0 0.5em;
      line-height: 1.5em;
      // this is really the only tricky part, you need to specify the background color of the container element...
      color: #818078;
      background-color: #fcfcfa;
    }

    &.vert{
      min-height: 70px;
      display: inline-block;

      &:after {
        top: 50%;
        transform: translateY(-50%);
      }
      &:before {
        background: linear-gradient(to bottom, transparent, #818078, transparent);
        left: 50%;
        top: 0;
        width: 1px;
        height: 100%;
      }
    }
  }
`
