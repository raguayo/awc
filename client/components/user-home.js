import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Celebtivities from "./Celebtivities";


/**
 * COMPONENT
 */
const UserHome = props => {
  const { email, firstName, lastName } = props;

  return (
    <div>
      <h3>
        Welcome, {firstName}, what would you like to do?
      </h3>
      <Celebtivities />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName
  };
};


/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};

export default connect(mapState)(UserHome);
