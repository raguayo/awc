import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCelebs } from '../../store/celebrity';
import SingleCelebrity from './SingleCelebrity';
import { NavLink } from 'react-router-dom';

class AllCelebrities extends Component {

  componentDidMount() {
    this.props.dispatchFetchCelebs();
  }

  render() {
    const celebrities = this.props.celebrities;

    return (
      <div id="all-celebs">
        <div className="row">
          <h4>$100/hour and less</h4>
          <hr></hr>
        </div>
        <div className="row">
        {
          celebrities.filter(celebrity => celebrity.hourlyPrice <= 100).map((celebrity, index, arr) => {
            return (
              <div key={index}>
                <SingleCelebrity isAdmin={this.props.isAdmin} key={celebrity.id} celebrity={ celebrity } length={arr.length} />
              </div>
              )
          })
        }
        </div>
        <div className="row">
          <h4>$101 to $500/hour</h4>
          <hr></hr>
        </div>
        <div className="row">
        {
          celebrities.filter(celebrity => celebrity.hourlyPrice > 100 && celebrity.hourlyPrice <= 500).map((celebrity, index, arr) => {
            return <SingleCelebrity isAdmin={this.props.isAdmin} key={index} celebrity={ celebrity } length={arr.length}/>;
          })
        }
        </div>
        <div className="row">
          <h4>$501/hour and more </h4>
          <hr></hr>
        </div>
        <div className="row">
        {
          celebrities.filter(celebrity => celebrity.hourlyPrice >500).map((celebrity, index, arr) => {
            return <SingleCelebrity isAdmin={this.props.isAdmin} key={index} celebrity={ celebrity } length={arr.length} />;
          })
        }
        </div>
       </div>

    );
  }
}

const mapState = state => {
  return {
    isAdmin: state.user.isAdmin,
    celebrities: state.celebrity.celebrities,
  };
};

const mapDispatch = dispatch => {
  return {
    dispatchFetchCelebs: () => dispatch(fetchCelebs()),
  };
};

export default connect(mapState, mapDispatch)(AllCelebrities);
