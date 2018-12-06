import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivities } from '../../store/activity';
import SingleActivity from './SingleActivity';

import { Row, Input, option } from 'react-materialize';

class AllActivities extends Component {

  constructor(props) {
    super(props);
    this.state = {
      duration: 'Choose',
      category: 'Choose',
    };
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleDurationSelect = this.handleDurationSelect.bind(this);
  }

  componentDidMount() {
    this.props.dispatchFetchActivities();
  }

  handleDurationSelect(evt) {
    this.setState({ duration: evt.target.value });
  }

  handleCategorySelect(evt) {
    this.setState({ category: evt.target.value });
  }

  render() {

    const activities = this.props.activities;

    return (

      <div id="all-activities">
        <Row>
          <Input s={2} type='select' label="Duration" onChange={this.handleDurationSelect}>
            <option value='Choose'>Choose</option>
            <option value={'0,1'}>1 hour and less</option>
            <option value={'1,3'}>1 - 3 hours</option>
            <option value={'3,5'}>3 - 5 hours</option>
            <option value={'5,7'}>5 - 7 hours</option>
            <option value={'7,9'}>7 - 9 hours</option>
            <option value={'9,11'}>9 - 11 hours</option>
            <option value={'11,13'}>11 - 13 hours</option>
            <option value={'13,15'}>13 - 15 hours</option>
          </Input>
          <Input s={2} type='select' label="Categories" onChange={this.handleCategorySelect}>
            <option value='Choose'>Choose</option>
            <option value='Adventure'>Adventure</option>
            <option value='Explore'>Explore</option>
            <option value='Holiday'>Holiday</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Illegal'>Illegal</option>
            <option value='Lifestyle'>Lifestyle</option>
            <option value='Violence'>Violence</option>
            <option value='Business'>Business</option>
            <option value='Food & Drink'>Food & Drink </option>
          </Input>
        </Row>
        <div className="row">
          {
            activities.filter(activity => {
              let [lower, upper] = this.state.duration.split(',');
              if (this.state.duration !== 'Choose') return activity.duration >= lower && activity.duration <= upper;
              else return true;
            })
              .filter(activity => {
                if (this.state.category !== 'Choose') return activity.category === this.state.category;
                else return true;
              })
              .map(activity => {
                return <SingleActivity activity={activity} />;
              })
          }
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    activities: state.activity.activities,
  };
};

const mapDispatch = dispatch => {
  return {
    dispatchFetchActivities: () => dispatch(fetchActivities()),
  };
};

export default connect(mapState, mapDispatch)(AllActivities);
