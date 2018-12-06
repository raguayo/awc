import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updatePassword } from "../store";

/**
 * COMPONENT
 */
const ResetPassword = props => {
  const { handleSubmit, error } = props;

  return (
    <div>
      <h1> AW GEEZ </h1>
      <h2> How embarrassing. </h2>
      <h3> Looks like you're gonna have to reset your password for security purposes. </h3>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <input name="id" type="hidden" value={props.id}/>
        </div>
        <div>
          <label htmlFor="password">
            <h5>Password</h5>
          </label>
          <input className="password" name="password" type="password" required/>
        </div>
        <div>
          <label htmlFor="confirm_password">
            <h5>Confirm Password</h5>
          </label>
          <input className="password" name="confirm_password" type="password" required/>
        </div>
        <div>
          <button type="submit">
            Change Password
          </button>
        </div>
        {error &&
          error.response &&
          <div>
            {" "}{error.response.data}{" "}
          </div>}
      </form>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    id: state.user.id,
    error: state.user.error,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const userId = evt.target.id.value;
      const userPassword = evt.target.password.value;
      const confirmPassword = evt.target.confirm_password.value;

      if(userPassword === confirmPassword){
        const objUser = {
          id: userId,
          password: userPassword,
        }

        dispatch(updatePassword(objUser));
      } else {
        alert('Passwords do not match!');
        $('.password')[0].value = '';
        $('.password')[1].value = '';
      }

    },
    updatePassword: function (user) {
      dispatch(updatePassword(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

/**
 * PROP TYPES
 */
ResetPassword.propTypes = {
  // password: PropTypes.string.isRequired,
  // repeatPassword: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
