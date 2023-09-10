import { Link, useRouteError } from 'react-router-dom'
import {
  GenericErrorContainer,
  GenericErrorTitleContainer,
  GenericErrorSubtitle,
  GenericErrorTitle
} from './GenericError.styled'

interface IProps {
  error?: unknown
}
export const GenericErrorPage = ({ error: customError }: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  let error = useRouteError() as any

  if (customError) error = customError

  return (
    <GenericErrorContainer className={customError ? '' : 'vh-100'}>
      <GenericErrorTitleContainer>
        <GenericErrorTitle>Oops!</GenericErrorTitle>
      </GenericErrorTitleContainer>
      <GenericErrorSubtitle>Sorry, an unexpected error has occured.</GenericErrorSubtitle>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <p>{error?.statusText || error?.message}</p>
      <Link to="/">Return to Homepage</Link>
    </GenericErrorContainer>
  )
}
