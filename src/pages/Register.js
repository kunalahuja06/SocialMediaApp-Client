import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import {useNavigate} from 'react-router-dom'
import gql from "graphql-tag";
import {useForm} from '../util/hooks'
import { useAuth } from "../authContext";
import "./styles.css";


function Register(props) {
  const [,dispatch]=useAuth()
  const navigate = useNavigate();
  const [errors,setErrors]=useState({})
   const { onChange, onSubmit, values } = useForm(registerUser, {
     username: "",
     email: "",
     password: "",
     confirmPassword: "",
   });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      dispatch({
        type: "LOGIN",
        payload: result.data.register,
        username: result.data.register.username,
      });
      localStorage.setItem("jwtToken", result.data.register.token);
            localStorage.setItem("username", result.data.register.username);

      navigate("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  });
  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <h1 className="page-title">Register</h1>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Form.Input
          label="Username"
          type="text"
          placeholder="Enter your username..."
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
          className="input"
        />
        <Form.Input
          label="Email"
          type="email"
          placeholder="Enter your Email..."
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
          className="input"
        />
        <Form.Input
          label="Password"
          type="password"
          placeholder="Password..."
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
          className="input"
        />
        <Form.Input
          label="confirm Password"
          type="password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          className="input"
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`; 

export default Register;
