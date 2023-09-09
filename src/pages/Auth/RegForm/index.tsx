import { Alert, FloatingLabel, Button, Form } from 'react-bootstrap'

export const RegForm = () => {
  return (
    <Form className="mb-3" onSubmit={null}>
      <h3 className="mb-4 text-center">Log in</h3>
      {/* 
      {auth.errorMessage && auth.errorMessage !== 'loading' && (
        <Alert dismissible variant="danger">
          {auth.errorMessage}
        </Alert>
      )} */}

      <FloatingLabel controlId="username" label="Username" className="mb-3">
        <Form.Control name="username" type="text" placeholder="Username" defaultValue={'demo2023'} />
      </FloatingLabel>
      <FloatingLabel controlId="password" label="Password" className="mb-3">
        <Form.Control name="password" type="password" placeholder="Password" defaultValue={'password'} />
      </FloatingLabel>

      <Form.Group className="text-center">
        {/* <Button variant="primary" type="submit" className="w-75" disabled={auth.errorMessage === 'loading'}>
          Register
        </Button> */}
      </Form.Group>
    </Form>
  )
}
