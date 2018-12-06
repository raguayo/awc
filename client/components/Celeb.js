import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCeleb } from '../store'
import { Link } from 'react-router-dom';
import moment from 'moment'

import Dropdown from 'react-dropdown';
import { NavItem, Button } from 'react-bootstrap';



class Celeb extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCeleb(this.props.match.params.id);
  }

  render() {
    let activities = [];
    let availableTimes = [];
    let defaultTime = '';
    if(this.props.celebrity.activities){
      activities = this.props.celebrity.activities;
    }
    if(this.props.celebrity.availabilities){
      availableTimes = this.props.celebrity.availabilities.map(availableTime => moment(availableTime).format('MMMM Do YYYY, h:mm:ss a'));
      let defaultTime = availableTimes[0];
    }

    return (
      <div className="container">
          <div key={this.props.celebrity.id} className="container celebrity_container">
            <div className="col-lg-6 col-md-6 col-sm-12 animated bounceInUp">
              <h3>{this.props.celebrity.fullName}</h3>
              <img src={this.props.celebrity.imageUrl}></img>
              <h4>What do you want to do with {this.props.celebrity.fullName}?</h4>
                {
                  activities.map(activity => {
                    return (
                      <div>
                        <h5>{activity.name}</h5>

                        <Dropdown options={availableTimes} onChange={this._onSelect} value={defaultTime} placeholder="Select a Date" />

                        <h7>Add to Cart</h7>
                      </div>
                    )
                })
              }
              <Link className="btn btn-primary" to='/celebrities/'>Back to All Celebrities</Link>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    celebrity: state.celeb.celebrity,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCeleb: function (id) {
      dispatch(fetchCeleb(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Celeb);
