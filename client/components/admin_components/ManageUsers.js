import React, { Component } from "react";
import { fetchUsers, deleteUser } from "../../store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class ManageUsers extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="container centertext">
        <h3>Users:</h3>
        {this.props.users && this.props.users.map(user => {
          return (<div key={user.id} className="container celebrity_container">
            <div className="col-lg-6 col-md-6 col-sm-12 animated bounceInUp">
              <div>
                <div>{`Name: ${user.firstName} ${user.lastName}`}</div>
                <div>{`Email: ${user.email}`}</div>
                <div>{`Is Admin: ${user.isAdmin}`}</div>
              </div>
              <br/>
              <div>
                <NavLink className="btn btn-primary" to={`/users/${user.id}`}>Get This Bad Boy!</NavLink>
              </div>
              <br/>
              <div>
                <a className="btn btn-primary" href="#" onClick={() => this.props.deleteUser(user.id)}>Remove This Bad Boy!</a>
              </div>
              <br/>
            </div>
          </div>)
        })}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.userMgmt.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: function () {
      dispatch(fetchUsers());
    },
    deleteUser: function (id) {
      dispatch(deleteUser(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
