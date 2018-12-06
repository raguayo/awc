import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class AdminNavbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="navbar-fixed" style={{marginBottom: '4em'}}>
                <nav id="real" className="nav-extended">
                    <div className="nav-wrapper">
                        <ul id="nav-mobile" className="right hide-on-med-and-down up-links">

                            <li><button onClick={this.props.handleClick} className="waves-effect waves-light btn">Log Out</button></li>

                        </ul>
                    </div>
                    <div className="nav-content">
                        <ul id="ext-links" className="tabs tabs-transparent">
                            <li className="tab"><NavLink to="/about" ><span><b>About</b></span></NavLink></li>
                            <li className="tab" ><NavLink to="/celebrities" ><span><b>Browse/Edit</b></span></NavLink></li>
                            <li className="tab" ><NavLink to="/add-celebrity" ><span><b>Add</b></span></NavLink></li>
                            <li className="tab" ><NavLink to="/users" ><span><b>User Management</b></span></NavLink></li>
                            <li className="tab disabled"><NavLink to="/activities"><span><b>Activities</b></span></NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
    );
  }
}
