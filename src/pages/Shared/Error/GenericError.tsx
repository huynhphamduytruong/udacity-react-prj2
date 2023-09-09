import { Link, useRouteError } from 'react-router-dom'
import {
  GenericErrorContainer,
  GenericErrorTitleContainer,
  GenericErrorSubtitle,
  GenericErrorTitle
} from './GenericError.styled'

export const GenericErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const error = useRouteError() as any

  return (
    <GenericErrorContainer>
      <GenericErrorTitleContainer>
        <GenericErrorTitle>Oops!</GenericErrorTitle>
      </GenericErrorTitleContainer>
      <GenericErrorSubtitle>Sorry, an unexpected error has occured.</GenericErrorSubtitle>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <p>{error.statusText || error.message}</p>
      <Link to="/">Return to Homepage</Link>
    </GenericErrorContainer>
  )
}
