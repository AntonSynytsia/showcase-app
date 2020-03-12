import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useAuth } from '../context/AuthContext';

import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button,
} from 'reactstrap';

const AppLogin = () => {
  const {
    state: { loading, isAuthenticated },
  } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    emailValid: null,
    pwdValid: null,
  });

  useEffect(() => {
    if (!loading && isAuthenticated) {
      clearFormData();
    }
  }, [isAuthenticated, loading]);

  const clearFormData = () => {
    setFormData(dat => ({
      ...dat,
      email: '',
      password: '',
      emailValid: null,
      pwdValid: null,
    }));
  };

  const onChangeEmail = e => {
    const email = e.target.value;
    let emailValid = null;
    if (email) {
      const email2 = email.trim();
      if (email2.length > 100) {
        emailValid = false;
      } else {
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        emailValid = re.test(email2);
      }
    }
    setFormData({ ...formData, [e.target.name]: email, emailValid });
  };

  const onChangePassword = e => {
    const pwd = e.target.value;
    let pwdValid = null;
    if (pwd) {
      pwdValid = pwd.length >= 8 && pwd.length <= 32;
    }
    setFormData({ ...formData, [e.target.name]: pwd, pwdValid });
  };

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    axios
      .put('api/users/auth', {
        email: formData.email.trim(),
        password: formData.password,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="loginEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="loginEmail"
            value={formData.email}
            onChange={e => onChangeEmail(e)}
            valid={formData.emailValid !== null && formData.emailValid}
            invalid={formData.emailValid !== null && !formData.emailValid}
          />
          <FormFeedback>Please enter a valid email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="loginPassword"
            value={formData.password}
            valid={formData.pwdValid !== null && formData.pwdValid}
            invalid={formData.pwdValid !== null && !formData.pwdValid}
            onChange={e => onChangePassword(e)}
          />
          <FormFeedback>Please enter a valid password.</FormFeedback>
        </FormGroup>
        <Button
          color="primary"
          onClick={onSubmit}
          disabled={loading || !(formData.emailValid && formData.pwdValid)}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
};

AppLogin.propTypes = {};

export default AppLogin;
