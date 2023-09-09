import { Container, Button, Form, FloatingLabel, Spinner, Toast, ToastContainer } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { authSelector } from 'features/Auth/authSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { saveQuestion } from 'features/Poll/pollSlice'
import { useState } from 'react'
import { BiCommentAdd } from 'react-icons/bi'

interface NewQuestionData {
  option1: string
  option2: string
}

export const AddQuestion = () => {
  const authStore = useAppSelector(authSelector)

  const { user } = authStore
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues, isValid },
    resetField
  } = useForm<NewQuestionData>({
    defaultValues: {
      option1: null,
      option2: null
    }
  })

  const onSubmit = (data) => {
    setLoading(true)
    setShowToast(false)

    void dispatch(
      saveQuestion({ author: user.id, options: { optionOne: data.option1, optionTwo: data.option2 } })
    ).then(() => {
      setLoading(false)
      setShowToast(true)
      resetField('option1')
      resetField('option2')
    })
  }

  return (
    <Container className="my-5">
      <ToastContainer className="p-3" position={'top-end'} style={{ zIndex: 999, marginTop: '70px' }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <BiCommentAdd className="me-2" />
            <strong className="me-auto">New question</strong>
          </Toast.Header>
          <Toast.Body>Add question successfully</Toast.Body>
        </Toast>
      </ToastContainer>

      <h1 className="text-center mb-4">Would You Rather?</h1>

      <Form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel controlId="username" label="Enter your first option" className="mb-3">
          <Form.Control
            data-testid="option1"
            name="option1"
            type="text"
            placeholder="Enter your first option"
            defaultValue={defaultValues.option1}
            aria-invalid={errors.option1 ? 'true' : 'false'}
            {...register('option1', { required: 'This field is required' })}
          />
          {errors.option1 && <Form.Text className="text-danger">{errors.option1.message}</Form.Text>}
        </FloatingLabel>

        <hr className="hr-text" data-content="OR" />

        <FloatingLabel controlId="username" label="Enter your second option" className="mb-3">
          <Form.Control
            data-testid="option2"
            name="option2"
            type="text"
            placeholder="Enter your second option"
            defaultValue={defaultValues.option2}
            aria-invalid={errors.option2 ? 'true' : 'false'}
            {...register('option2', { required: 'This field is required' })}
          />
          {errors.option2 && <Form.Text className="text-danger">{errors.option2.message}</Form.Text>}
        </FloatingLabel>

        <div className="text-center">
          <Button data-testid="submit-btn" variant="primary" type="submit" disabled={loading || !isValid}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              <>{'Submit'}</>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  )
}
