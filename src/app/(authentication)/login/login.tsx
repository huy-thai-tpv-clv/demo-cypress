'use client';

import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import InputGroupText from 'react-bootstrap/InputGroupText';

export default function Login() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getRedirect = () => {
    const redirect = getCookie('redirect');
    if (redirect) {
      deleteCookie('redirect');
      return redirect.toString();
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
        router.push(`${getRedirect()}`);
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
  );
}
