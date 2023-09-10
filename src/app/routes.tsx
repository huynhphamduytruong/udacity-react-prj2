import { Link, Navigate, RouteObject } from 'react-router-dom'
import { ProtectedRoot } from './ProtectedRoot'
import { HomePage } from 'pages/Home'
import { LoginForm } from 'pages/Auth/LoginForm'
import { AuthPage } from 'pages/Auth'
import { Leaderboard } from 'pages/Leaderboard'
import { AddQuestion } from 'pages/AddQuestion'
import { QuestionDetails } from 'components/QuestionDetails'

import store from 'app/store'
import { GenericErrorPage } from 'pages/Shared/Error/GenericError'
import { getPolls } from 'features/Poll/pollSlice'

export const AppRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <GenericErrorPage />,
    children: [
      {
        element: <Navigate to={'login'} relative="path" />,
        index: true
      },
      {
        path: 'login',
        element: <LoginForm />
      },
      {
        path: 'register',
        element: (
          <>
            <div>New feature in future :)</div>
            <Link to={'/auth/login'}>Back to login</Link>
          </>
        )
      }
    ]
  },
  {
    path: '/',
    element: <ProtectedRoot />,
    errorElement: <GenericErrorPage />,
    children: [
      {
        element: <HomePage />,
        index: true
      },
      {
        path: 'questions/:pollId',
        loader: async ({ params }) => {
          await store.dispatch(getPolls())
          const { polls: pollsStore } = store.getState()
          return pollsStore.polls.find((p) => p.id === params.pollId) ?? null
        },
        element: <QuestionDetails />
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />
      },
      {
        path: 'add',
        element: <AddQuestion />
      }
    ]
  }
]
