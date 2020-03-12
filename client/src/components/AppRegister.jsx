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

const AppRegister = () => {
  const {
    state: { loading, isAuthenticated },
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    nameValid: null,
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
      name: '',
      email: '',
      password: '',
      address: '',
      nameValid: null,
      emailValid: null,
      pwdValid: null,
    }));
  };

  const onChangeName = e => {
    const name = e.target.value;
    let nameValid = null;
    if (name) {
      const name2 = name.trim();
      nameValid = name2.length > 1 ? true : false;
    }
    setFormData({ ...formData, [e.target.name]: name, nameValid });
  };

  const onChangeAddress = e => {
    const address = e.target.value;
    setFormData({ ...formData, [e.target.name]: address });
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
      .post('api/users', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        address: formData.address.trim(),
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
          <Label for="regName">Name</Label>
          <Input
            type="text"
            name="name"
            id="regName"
            value={formData.name}
            onChange={e => onChangeName(e)}
            valid={formData.nameValid !== null && formData.nameValid}
            invalid={formData.nameValid !== null && !formData.nameValid}
          />
          <FormFeedback>Please enter a valid name.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="regEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="regEmail"
            value={formData.email}
            onChange={e => onChangeEmail(e)}
            valid={formData.emailValid !== null && formData.emailValid}
            invalid={formData.emailValid !== null && !formData.emailValid}
          />
          <FormFeedback>Please enter a valid email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="regPassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="regPassword"
            value={formData.password}
            valid={formData.pwdValid !== null && formData.pwdValid}
            invalid={formData.pwdValid !== null && !formData.pwdValid}
            onChange={e => onChangePassword(e)}
          />
          <FormFeedback>Please enter a valid password.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="regAddress">Address</Label>
          <Input
            type="text"
            name="address"
            id="regAddress"
            value={formData.address}
            onChange={e => onChangeAddress(e)}
          />
        </FormGroup>
        <Button
          color="primary"
          onClick={onSubmit}
          disabled={loading || !(formData.emailValid && formData.pwdValid)}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

AppRegister.propTypes = {};

export default AppRegister;
