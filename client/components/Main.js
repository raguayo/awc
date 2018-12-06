import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { logout } from "../store";
import PageNavbar from './Navbar';
import AllCelebrities from './Celebrities/AllCelebrities';
import AllActivities from './Activities/AllActivities';
import AdminNavbar from "./admin_components/AdminNavbar";
import GuestNavbar from "./GuestNavbar"
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = props => {
  const { children, handleClick, isLoggedIn, isAdmin } = props;

  return (

    <div>
      {isLoggedIn ? isAdmin ? <AdminNavbar handleClick={handleClick}/> : <PageNavbar handleClick={handleClick}/> : <GuestNavbar /> }


        {children}
    </div>


  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
