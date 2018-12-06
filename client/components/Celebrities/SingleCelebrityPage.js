import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, MenuItem, Row, Input, option, Button, Icon } from 'react-materialize';
import { fetchActivities } from '../../store/activity';
import { fetchCeleb } from '../../store/celebrity';

import moment from 'moment';

class SingleCelebrityPage extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatchFetchCeleb();
    this.props.dispatchFetchActivities();

  }


  addToCart () {

  }

  render() {
    const celebrity = this.props.celebrity;
    const activities = this.props.activities;

    return (
      <div className="row" style={{ marginTop: '3em', paddingTop: '2em' }}>
      <div className="col s2"></div>
      <div className="col s8">
        <div className="col s3">
        <img className="circle" style={{height: '250px', width: '100%'}} src={celebrity.imageUrl}></img>
        <hr></hr>
        </div>
      </div>
      <div classNAme="col s2"></div>
      </div>
    );
  }


}

const mapState = state => {

  return {
    celebrity: state.celebrity.celebrity,
    activities: state.activity.activities,
  };
}

const mapDispatch = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id) || 0;
  return {
    dispatchFetchActivities: () => dispatch(fetchActivities()),
    dispatchFetchCeleb: () => dispatch(fetchCeleb(id)),
  };
}

export default connect(mapState, mapDispatch)(SingleCelebrityPage);