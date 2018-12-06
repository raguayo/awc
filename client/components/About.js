import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export default class About extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    (function($) {
      $(function() {
        $(".button-collapse").sideNav();
        $(".parallax").parallax();
      }); // end of document ready
    })(jQuery); // end of jQuery name space
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <h1 className="header center blue-text  text-lighten-2">
                Celebtivities
              </h1>
              <div className="row center">
                <h5 className="header col s12 light">
                  Become acquianted with some of the most famous people in the world, one activity at a time.
                </h5>
              </div>
              <div className="row center">
                <NavLink
                  to="/celebrities"
                  className="btn-large waves-effect waves-light blue lighten-2"
                >
                  View Celebrities
                </NavLink>
              </div>
            </div>
          </div>
          <div className="parallax">
            <img src="background1.jpg" alt="Unsplashed background img 1" />
          </div>
        </div>

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">assignment_ind</i>
                  </h2>
                  <h5 className="center">Celebrities</h5>
                  <p className="light">
                    We all have the dream of meeting our favorite celebrity, Jetskis makes this possible!
                    Browse through a selection of famous figures who have volunteered their time for this service.
                    5% of all proceeds go to charity!
                  </p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">group</i>
                  </h2>
                  <h5 className="center">All About You</h5>
                  <p className="light">
                    We are the only service that provides celebrity companionship to those seeking.
                    Our celebrities are trained to be as courteous and polite as possible to the user, though
                    we will not be held accountable for any misconduct. We encourage our celebrities to let their true personality shine.
                  </p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">build</i>
                  </h2>
                  <h5 className="center">Easy to Use</h5>
                  <p className="light">
                    Don't you hate doing all that work to book time with your favourite celebrity? US TOO!
                    Celebtivities has a simple, clean interface which will get you having coffee with Joe McFamous in no time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="header col s12 light">
                  See if the person behind the screen is as cool as you thought.
                </h5>
              </div>
            </div>
          </div>
          <div className="parallax">
            <img src="background2.jpg" alt="Unsplashed background img 2" />
          </div>
        </div>

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 center">
                <h3>
                  <i className="mdi-content-send brown-text" />
                </h3>
                <h4>Contact Us</h4>
                <p className="left-align light">
                  Our team of professional engineers and marketers work together to provide the most seamless Celebitivity experience possible.
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="header col s12 light">What are you waiting for? Book a Celebtivity today!</h5>
              </div>
            </div>
          </div>
          <div className="parallax"><img src="background3.jpg" alt="Unsplashed background img 3"></img></div>
      </div>
    </div>
    );
  }
}
