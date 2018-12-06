import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === "signup"
          ? <div>
              <div>
                <label htmlFor="first_name">
                  <small>First Name</small>
                </label>
                <input name="first_name" type="text" required title="First name must be at least two characters."/>
              </div>
              <div>
                <label htmlFor="last_name">
                  <small>Last Name</small>
                </label>
                <input name="last_name" type="text" pattern=".{2,}" required title="Last name must be at least two characters."/>
              </div>
            </div>
          : null}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" required/>
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" required/>
        </div>
        <div>
          <button type="submit">
            {displayName}
          </button>
        </div>
        {error &&
          error.response &&
          <div>
            {" "}{error.response.data}{" "}
          </div>}
      </form>
      <a href="/auth/google">
        {displayName} with Google
      </a>
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
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      let first_name;
      let last_name;
      if (evt.target.first_name) {
        first_name = evt.target.first_name.value;
        last_name = evt.target.last_name.value;
      }
      dispatch(auth(email, password, formName, first_name, last_name));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
