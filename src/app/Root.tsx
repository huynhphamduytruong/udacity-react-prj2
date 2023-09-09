import { AuthPage } from 'pages/Auth'
import { PublicLayout } from 'pages/Shared/Layout'

export const Root = () => {
  return (
    <PublicLayout>
      <AuthPage />
    </PublicLayout>
  )
}
