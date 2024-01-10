import React, { useContext } from 'react';
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { loginUser, updateLoginInfo, loginInfo, loginError, isLoginLoading } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(e);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row
          style={{
            height: '100vh',
            justifyContent: 'center',
            padding: '10%',
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    email: e.target.value,
                  })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {isLoginLoading ? 'Getting you in ...' : 'Login'}
              </Button>
              {loginError?.error && typeof loginError.message === 'string' && (
                <Alert variant="danger">
                  <p>{loginError.message}</p>
                </Alert>
              )}
              {loginError?.error && typeof loginError.message !== 'string' && (
                <Alert variant="danger">
                  <p>Email or Password not Right</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;