import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSelectedUser, grantAdminAccess, revokeAdminAccess, setResetPasswordFlag } from '../../store';
import { Link } from 'react-router-dom';

class SelectedUser extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchSelectedUser(this.props.match.params.id);
  }

  render() {
    const {
      id, firstName, lastName,
      email, isAdmin
    } = this.props.selectedUser;
    return (
      <div className="container centertext">
        <h3>Set User Admin Acess and Reset Password</h3>
        <div className="col-lg-6 col-md-6 col-sm-12 animated bounceInUp">
          <h4>Details:</h4>
          <div>
            <div>{`ID: ${id}`}</div>
            <div>{`Name: ${firstName} ${lastName}`}</div>
            <div>{`Email: ${email}`}</div>
            <div>{`Is Admin: ${isAdmin}`}</div>
          </div>
          <br />
          <div>
            {isAdmin ?
              <a className="btn btn-primary" href="#" onClick={() => this.props.revokeAdminAccess(id)}>Revoke User Admin Access</a>
              :
              <a className="btn btn-primary" href="#" onClick={() => this.props.grantAdminAccess(id)}>Grant User Admin Access</a>
            }
          </div>
          <br />
          <div>
            <a className="btn btn-primary" href="#" onClick={() => this.props.setResetPasswordFlag(id)}>Reset Password</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedUser: state.userMgmt.selectedUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSelectedUser: function (id) {
      dispatch(fetchSelectedUser(id));
    },
    grantAdminAccess: function (id) {
      dispatch(grantAdminAccess(id));
    },
    revokeAdminAccess: function (id) {
      dispatch(revokeAdminAccess(id));
    },
    setResetPasswordFlag: function (id) {
      dispatch(setResetPasswordFlag(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUser);
