import React, { Component } from "react";
import { postCeleb } from "../../store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import history from '../../history';
import { AddSingleActivity, makeActivityArray, AddSingleDate, makeAvailabilityArray }from './AddForms';

export class AddCelebrity extends Component {
  constructor() {
    super();
    this.state = {
      availabilityNum: [],
      activityNum: [],
    }
    this.addActivityField = this.addActivityField.bind(this);
    this.addAvailabilityField = this.addAvailabilityField.bind(this);
  }

  addAvailabilityField() {
    this.setState(prev => ({ availabilityNum: [...prev.availabilityNum, <AddSingleDate key={prev.availabilityNum.length} num={prev.availabilityNum.length}/>] }))
  }

  addActivityField() {
    this.setState(prev => ({ activityNum: [...prev.activityNum, <AddSingleActivity key={prev.activityNum.length} num={prev.activityNum.length}/>]}))  
  }

  render() {
    return (
      <div className="container centertext">
        <div className="row">
          <h3> Add Celebrity: </h3>
          <div className="col l12 s12 m12">
            <form onSubmit={this.props.handleSubmit(this.state.availabilityNum.length, this.state.activityNum.length)}>
              <div className="row">
                <div className="input-group input-group-lg">
                  <label>Celebrity Name: </label>
                  <input className="form-control" type="text" name="name" required/>
                </div>
                <div className="input-group input-group-lg">
                  <label>Link to Image: </label>
                  <input className="form-control" type="text" name="image" required/>
                </div>
                <div className="input-group input-group-lg">
                  <label>Hourly Price: </label>
                  <input className="form-control" type="number" name="hourly" required/>
                </div>
                <div className="input-group input-group-lg" id="availabilities">
                  <h4>Availabilities </h4>
                  <div
                    className="btn btn-primary"
                    onClick={this.addAvailabilityField}
                  >
                    +
                  </div>
                  {this.state.availabilityNum}
                </div>
              </div>
              <h4>Activities: </h4>
              <div className="btn btn-primary" onClick={this.addActivityField}>
                +
              </div>
              <div id="activities">
                {this.state.activityNum}
              </div>
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  Add this Bad Boy
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    );

  }
}


function mapStateToProps(state, ownProps) {
  return {
    celebrity: state.celeb.celebrity,
    availabilityNum: 1
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postCeleb: function(celeb) {
      dispatch(postCeleb(celeb));
    },
    handleSubmit: (availabilityNum, activityNum) => event => {
      event.preventDefault();
      dispatch(
        postCeleb({
          fullName: event.target.name.value,
          imageUrl: event.target.image.value,
          hourlyPrice: event.target.hourly.value,
          availabilities: makeAvailabilityArray(event.target, availabilityNum),
        }, makeActivityArray(event.target, activityNum))
      );
      history.push('/celebrities')
    }


  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCelebrity);
