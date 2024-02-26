'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios, { AxiosError } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import Link from 'next/link';
import { FC, SyntheticEvent, useState } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Alert,
} from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';

const LoginPage: FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getRedirect = () => {
    const redirect = getCookie('redirect');
    if (redirect) {
      deleteCookie('redirect');
      return `${redirect.toString()}/pokemons`;
    }

    return '/pokemons';
  };

  const login = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(email, password);

    setSubmitting(true);

    try {
      const res = await axios.post('api/mock/login', {
        email,
        password,
      });
      if (res.status === 200) {
        window.location.href = `${getRedirect()}`;
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err;
        setError(response?.data || 'Internal server error');
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Row className="justify-content-center align-items-center px-3">
      <Col lg={8}>
        <Row>
          <Col md={7} className="bg-white border p-5">
            <div>
              <h1>Login</h1>
              <p className="text-black-50">Sign In to your account</p>
              <>
                <Alert
                  variant="danger"
                  show={error !== ''}
                  onClose={() => setError('')}
                  dismissible
                >
                  {error}
                </Alert>
                <Form onSubmit={login}>
                  <InputGroup className="mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faUser} fixedWidth />
                    </InputGroupText>
                    <FormControl
                      name="username"
                      required
                      disabled={submitting}
                      placeholder="Email"
                      aria-label="email"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faLock} fixedWidth />
                    </InputGroupText>
                    <FormControl
                      type="password"
                      name="password"
                      required
                      disabled={submitting}
                      placeholder="Password"
                      aria-label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>

                  <Row className="align-items-center">
                    <Col xs={6}>
                      <Button
                        className="px-4"
                        variant="primary"
                        type="submit"
                        data-cy="login-btn"
                        disabled={submitting}
                      >
                        Login
                      </Button>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Link className="px-0" href="#">
                        Forgot password?
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </>
            </div>
          </Col>
          <Col
            md={5}
            className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
          >
            <div className="text-center">
              <h2>Sign up</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link
                className="btn btn-lg btn-outline-light mt-3"
                href="/register"
              >
                Register Now!
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginPage;
