import Layout from 'pages/Shared/Layout'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from './hooks'

export const ProtectedRoot = () => {
  const authData = useAppSelector((state) => state.auth)
  const location = useLocation()

  if (!authData.isAuthenticated) {
    return <Navigate to={'/auth/login'} state={{ redirectUrl: location.pathname }} replace />
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
