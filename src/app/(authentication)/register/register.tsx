'use client';

import { Alert, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { validatePassword } from '@/utils/helper';

export default function Register() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const getRedirect = () => {
    const redirect = getCookie('redirect');
    if (redirect) {
      deleteCookie('redirect');
      return redirect.toString();
    }

    return '/';
  };

  const register = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (password !== passwordRepeat) {
      setError('Password does not match');
      return;
    }

    const validatedPassword = validatePassword(password);
    if (validatedPassword.error) {
      setError(validatedPassword.error);
      return;
    }

    setSubmitting(true);

    try {
      const res = await axios.post('api/mock/register', {
        email,
        password,
        username,
      });
      if (res.status === 200) {
        window.location.href = getRedirect();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
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
      <Form onSubmit={register}>
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </InputGroupText>
          <FormControl
            name="username"
            required
            disabled={submitting}
            placeholder="Username"
            aria-label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faEnvelope} fixedWidth />
          </InputGroupText>
          <FormControl
            type="email"
            name="email"
            required
            disabled={submitting}
            placeholder="Email"
            aria-label="Email"
            onChange={(e) => setEmail(e.target.value)}
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

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faLock} fixedWidth />
          </InputGroupText>
          <FormControl
            type="password"
            name="password_repeat"
            required
            disabled={submitting}
            placeholder="Repeat password"
            aria-label="Repeat password"
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </InputGroup>

        <Button
          type="submit"
          className="d-block w-100"
          disabled={submitting}
          variant="success"
          data-cy="register-btn"
        >
          Create Account
        </Button>
      </Form>
    </>
  );
}
