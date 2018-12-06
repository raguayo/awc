import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCelebtivity } from '../store'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class Celebtivity extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCelebtivity(this.props.match.params.id);
  }

  render() {
    //const currentCeleb = this.props.match.params.id
    const currActivity = this.props.celebtivity.activities.filter(activity => activity.id === this.props.celebtivity.id)[0]
    return (
      <div className="container">
        <img src={this.props.celebtivity.imageUrl}></img>
        <h1>{currActivity} With {this.props.celebtivity.fullName}</h1>
        <NavLink className="btn btn-primary" to={`/home`}>Back to All Celebtivities</NavLink>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    celebtivity: state.celebtivities.celebtivities.filter(celebtivity => celebtivity.id === +ownProps.match.params.id)[0],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCelebtivity: function (id) {
      dispatch(fetchCelebtivity(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Celebtivity);
