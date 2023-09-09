import Layout from 'pages/Shared/Layout'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from './hooks'

export const ProtectedRoot = () => {
  const authData = useAppSelector((state) => state.auth)

  if (!authData.isAuthenticated) {
    return <Navigate to={'/auth'} replace />
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
