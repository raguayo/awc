import React, { Component } from "react";
import { editCeleb, fetchCeleb, editCelebtivities, deleteCeleb } from "../../store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import history from '../../history'
import { AddSingleActivity, makeActivityArray, AddSingleDate, makeAvailabilityArray }from './AddForms';

export class EditCelebrity extends Component {
  constructor() {
    super();
    this.state = {
      availabilityNum: [],
      activityNum: [],
    }
    this.addActivityField = this.addActivityField.bind(this);
    this.addAvailabilityField = this.addAvailabilityField.bind(this);
  }

  componentDidMount() {
    this.props.fetchCeleb(this.props.match.params.id);
  }

   addAvailabilityField() {
    this.setState(prev => ({ availabilityNum: [...prev.availabilityNum, <AddSingleDate key={prev.availabilityNum.length} num={prev.availabilityNum.length}/>] }))
  
  }

  addActivityField() {
    this.setState(prev => ({ activityNum: [...prev.activityNum, <AddSingleActivity key={prev.activityNum.length} num={prev.activityNum.length}/>]}))  
  }


  render() {
    return (
      <div className="container">
        <div
          key={this.props.celebrity.id}
          className="container celebrity_container"
        >
          <div className="col-lg-12 col-md-12 col-sm-12 animated bounceInUp">
            <form onSubmit={this.props.handleSubmit(this.props.celebrity, this.state.availabilityNum.length, this.state.activityNum.length)}>
              <h3>Celebrity Info: </h3>
              <div className="input-group input-group-lg">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder={this.props.celebrity.fullName}
                  id="celebname"
                />
                <label>Celebrity Name </label>
                <img src={this.props.celebrity.imageUrl} />
                <input
                  className="form-control"
                  type="text"
                  name="image"
                  placeholder={this.props.celebrity.imageUrl}
                />
                <label>Celebrity Image </label>
                <input className="form-control" type="number" name="hourly" placeholder={this.props.celebrity.hourlyPrice} required/>
                <label>Hourly Price </label>
                <h3> Available Times: </h3>
                {this.props.celebrity.availabilities ? this.props.celebrity.availabilities.map((time, i) => (
                  <div key={time}>
                    <h6>{time}</h6>
                    <input type="checkbox" name={'delete_time' + i} id={'delete_time' + i} value={time} /> <label htmlFor={'delete_time' + i}>Delete</label>
                  </div>
                )) : null}
                <div id="availabilities"></div>
                <div className="btn btn-primary" onClick={this.addAvailabilityField}>
                  Add Availability
                </div>
                {this.state.availabilityNum}
                <h3> Activities: </h3>
                {this.props.celebrity.activities ? this.props.celebrity.activities.map((activity, i) => (
                  <div key={activity.id}>
                    <h6>{activity.name}</h6>
                    <input type="checkbox" name={'delete_activity' + i} id={'delete_activity' + i} value={activity.id} />  <label htmlFor={'delete_activity' + i}>Delete</label>
                  </div>
                )) : null }
                <div className="btn btn-primary" onClick={this.addActivityField}>
                  Add Activity
                </div>
              </div>
              <div id="activities"></div>
              {this.state.activityNum}
              <NavLink className="btn btn-danger" to="/celebrities" onClick={this.props.deleteCeleb(this.props.celebrity)}>
                Delete This Celebrity
              </NavLink>
              <button className="btn btn-success" type="submit">
                Edit this Bad Boy
              </button>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCeleb: function(celeb) {
      dispatch(fetchCeleb(celeb));
    },
    editCeleb: function(celeb) {
      dispatch(editCeleb(celeb));
    },
    deleteCeleb: celeb => () => {
      dispatch(deleteCeleb(celeb));
    },
    editCelebtivities: function(celeb, deleteTheseActivities, addTheseActivities){
      dispatch(editCelebtivities(celeb, deleteTheseActivities, addTheseActivities))
    },
    handleSubmit: (celeb, availabilityNum, activityNum) => event => {
      event.preventDefault()
      let newAvailabilities = makeAvailabilityArray(event.target, availabilityNum);

      let removedAvailabilities = celeb.availabilities.filter((time, i) => {
        return !event.target[`delete_time${i}`].checked;
      })

      let editedAvailabilities = [...newAvailabilities, ...removedAvailabilities];

      let deleteTheseActivities = celeb.activities.filter((activity, i) => {
        activity.active = false;
        return event.target[`delete_activity${i}`].checked;
      })

      let addTheseActivities = makeActivityArray(event.target, activityNum);

      dispatch(editCelebtivities({
        id: celeb.id,
        fullName: event.target.name.value === '' ? celeb.fullName : event.target.name.value,
        imageUrl: event.target.image.value === '' ? celeb.imageUrl : event.target.image.value,
        hourlyPrice: event.target.hourly.value === '' ? celeb.hourlyPrice : event.target.hourly.value,
        availabilities: editedAvailabilities,
      }, deleteTheseActivities, addTheseActivities))
      //delete celebtivities

      //add new celebtivites
      history.push(`/celebrities`)
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditCelebrity);
