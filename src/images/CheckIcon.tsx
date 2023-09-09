import React from 'react'

interface IProps {
  className?: string
}

function CheckIcon({ className }: IProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 60 60" className={className ?? ''}>
      <path
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8.125"
        d="M4.687 31.376c6.444 5.864 10.608 11.142 17.501 23.374C37.172 16.927 57.69 7.216 55.088 5.542c-5.264-3.532-30.874 26.075-33.97 29.981-3.725-1.972-16.43-8.865-16.43-4.147z"
      ></path>
      <path
        fill="#62b01e"
        fillRule="evenodd"
        stroke="#62b01e"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.125"
        d="M4.687 31.376c6.444 5.864 10.608 11.142 17.501 23.374C37.172 16.927 57.69 7.216 55.088 5.542c-5.264-3.532-30.874 26.075-33.97 29.981-3.725-1.972-16.43-8.865-16.43-4.147z"
      ></path>
    </svg>
  )
}

export default React.memo(CheckIcon)
