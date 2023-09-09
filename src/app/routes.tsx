import { Link, Navigate, RouteObject, redirect } from 'react-router-dom'
import { ProtectedRoot } from './ProtectedRoot'
import { HomePage } from 'pages/Home'
import { LoginForm } from 'pages/Auth/LoginForm'
import { AuthPage } from 'pages/Auth'
import { Leaderboard } from 'pages/Leaderboard'
import { AddQuestion } from 'pages/AddQuestion'
import { QuestionDetails } from 'components/QuestionDetails'

import store from 'app/store'
import { GenericErrorPage } from 'pages/Shared/Error/GenericError'

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
        path: 'polls/:pollId',
        loader: async ({ params }) => {
          const { polls: pollsStore, auth } = store.getState()
          if (!auth.isAuthenticated) return redirect('/auth')
          const question = pollsStore.polls.find((p) => p.id === params.pollId)
          if (!question) throw new Response('Question not found', { status: 404, statusText: 'Question not found' })

          return question
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
