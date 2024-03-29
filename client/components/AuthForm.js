import React from "react";
import { connect } from "react-redux";
import { authenticate, authenticateSign } from "../store";
import AllProducts from "./AllProducts";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, handleDemoAdminSubmit, handleDemoSubmit, error } = props;

  return (
    <div>
      <h3>
      Hello, and welcome to Guitar Mart!
      </h3>
      <p>For the full customer experience, please login! Otherwise, you can still order items and checkout.</p>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {props.name === 'signup' ? <><div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div><div>
          </div></> : <></>
        }

        <div>
          <button type="submit">{displayName}</button>
        </div>
        <button type='button' onClick={handleDemoSubmit}>Sign In With Demo Account</button>
        <button type='button' onClick={handleDemoAdminSubmit}>Sign In With Demo Admin Account</button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
    handleDemoSubmit(evt) {
      evt.preventDefault()
      const username = 'demo'
      const password = 'demo'
      dispatch(authenticate(username, password, 'login'))

    },
    handleDemoAdminSubmit(evt) {
      evt.preventDefault()
      const username = 'demoAdmin'
      const password = 'demo'
      dispatch(authenticate(username, password, 'login'))
    },
  };
};

const mapDispatchSign = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email.value

      dispatch(authenticateSign(username, password, email, formName));
    },
    handleDemoSubmit(evt) {
      evt.preventDefault()
      const username = 'demo'
      const password = 'demo'
      dispatch(authenticate(username, password, 'login'))
    },
    handleDemoAdminSubmit(evt) {
      evt.preventDefault()
      const username = 'demoAdmin'
      const password = 'demo'
      dispatch(authenticate(username, password, 'login'))
    },
  };
};


export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatchSign)(AuthForm);
