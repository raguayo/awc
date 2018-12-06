import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavItem } from 'react-materialize';

export default class GuestNavbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="main-nav" style={{paddingBottom: '2em'}}>
            <Navbar id="real" fixed={true} brand={<NavLink to="/home" style={{ marginLeft: '0.5em' }}><i className="material-icons main-color">shopping_cart</i></NavLink>} className="up-links" right>
              <ul>
                <li><NavLink to="/signup">Sign Up</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/cart"><span><i className="material-icons main-color">shopping_cart</i></span></NavLink></li>
              </ul>
            </Navbar>

            <div className='col s12 z-depth-1' id="nav2" style={{ backgroundColor: '#4b71fc', height: '3em', position: 'fixed', float: 'left', zIndex: '2' }}>
                <ul id="ext-links" style={{ margin: '0em', marginLeft: '1em'}}>
                  <li style={{ display: 'inline-block', padding: '1em' }}><NavLink to="/" ><span style={{ color: 'white' }}><b>ABOUT</b></span></NavLink></li>
                  <li style={{ display: 'inline-block', padding: '1em' }} ><NavLink to="/celebrities" ><span style={{ color: 'white' }}><b>CELEBRITIES</b></span></NavLink></li>
                  <li style={{ display: 'inline-block', padding: '1em' }}><NavLink to="/activities"><span style={{ color: 'white' }}><b>ACTIVITIES</b></span></NavLink></li>
                </ul>
            </div>
    </div>
    );
  }
}
