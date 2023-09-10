import { useAppSelector, useAppDispatch } from 'app/hooks'
import { authSelector } from 'features/Auth/authSlice'
import { Alert, FloatingLabel, Button, Card, Form, Spinner } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import ReactSelect from 'react-select'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginAsync } from 'features/Auth/authSlice'
import { useEffect, useState, useMemo } from 'react'
import { User } from 'types'
import { getUsers, usersSelector } from 'features/User/userSlice'

interface FormValues {
  username: string
  password: string
  rememberMe?: boolean
}
export const LoginForm = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const usersStore = useAppSelector(usersSelector)
  const auth = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  const location = useLocation()
  const redirectUrl = useMemo(() => location.state?.redirectUrl ?? '/', [location.state])

  const { loading, users: impersonateUsers } = usersStore

  useEffect(() => {
    void dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
    setValue: setFormValue
  } = useForm({
    defaultValues: {
      username: 'mtsamis',
      password: 'xyz123',
      rememberMe: false
    } as FormValues
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    void dispatch(loginAsync(data))
  }

  const onUserSelectChange = (option) => {
    setSelectedUser(option?.value)

    if (option) {
      setFormValue('username', option.value.id)
      setFormValue('password', option.value.password)
    } else {
      setFormValue('username', '')
      setFormValue('password', '')
    }
  }

  if (auth.isAuthenticated) return <Navigate to={redirectUrl} replace />

  return (
    <>
      <Form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-4 text-center">Log in</h3>

        {auth.errorMessage && auth.errorMessage !== 'loading' && (
          <Alert dismissible variant="danger">
            {auth.errorMessage}
          </Alert>
        )}

        <FloatingLabel controlId="username" label="Username" className="mb-3">
          <Form.Control
            name="username"
            type="text"
            placeholder="Username"
            defaultValue={defaultValues.username}
            aria-invalid={errors.username ? 'true' : 'false'}
            disabled={!!selectedUser}
            {...register('username', { required: 'Required' })}
          />
          {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            defaultValue={defaultValues.password}
            aria-invalid={errors.password ? 'true' : 'false'}
            disabled={!!selectedUser}
            {...register('password', { required: 'Required' })}
          />
          {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
        </FloatingLabel>

        <hr className="hr-text" data-content="OR" />

        <Form.Group className="mb-3">
          <label htmlFor="user-select">Impersonate as</label>
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <ReactSelect
              id="user-select"
              data-testid="impersonateUsersSelect"
              placeholder="Select user to impersonate..."
              options={impersonateUsers.map((x) => ({ label: x.name, value: x }))}
              onChange={onUserSelectChange}
              isClearable
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Switch type="switch" id="custom-switch" label="Remember me?" {...register('rememberMe')} />
        </Form.Group>
        <Form.Group className="text-center">
          <Button
            data-testid="submitBtn"
            variant="primary"
            type="submit"
            className="w-100 text-center"
            disabled={auth.errorMessage === 'loading' || Object.keys(errors).length > 0}
          >
            {auth.errorMessage === 'loading' ? (
              <>
                <Spinner
                  data-testid="submitSpinner"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {' Login'}
              </>
            ) : (
              <>Login</>
            )}
          </Button>
        </Form.Group>
      </Form>

      <Card body className="text-center">
        Don't have account yet?&nbsp;
        <Link to="/auth/register" replace>
          Register now
        </Link>
        .
      </Card>
    </>
  )
}
