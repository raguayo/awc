import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { fetchCelebtivities } from '../store'
import { fetchCelebs } from '../store'


class Celebtivities extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCelebtivities();
  }

  render() {
    return (
      <div className="container">
          {this.props.celebtivities.celebtivities.map(celebrity => {
              return (<div key={celebrity.id} className="container celebrity_container">
                  <div className="col-lg-6 col-md-6 col-sm-12 animated bounceInUp">
                      {celebrity.activities.map(celebtivity => {
                        return (<div key={celebtivity.id}>
                          <h3>{celebtivity.name} with {celebrity.fullName}</h3>
                          <h5>Price: {celebtivity.celebtivity.price}</h5>
                          <img src={celebrity.imageUrl}></img>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
                          <NavLink className="btn btn-primary" to={`/celebtivities/${celebrity.id}`}>Click this badboy!!</NavLink>
                        </div>)
                      })}
                  </div>
              </div>)
          })}
      </div>
      )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    celebtivities: state.celebtivities,
    celebtivity: state.celebtivities.celebtivity,
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    celebs: state.celeb.celebrities,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCelebtivities: function() {
      dispatch(fetchCelebtivities())
    }
    // ,
    // fetchCelebs: function() {
    //   dispathc(fetchCelebs())
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Celebtivities);
