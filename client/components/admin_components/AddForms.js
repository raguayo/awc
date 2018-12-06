import React, { Component } from "react";

export const AddSingleActivity = props =>
     (<div className="activity_div">
                  <input
                    className="form-control"
                    type="text"
                    name={`activityName${props.num}`}
                    required
                  />
                  <label>Activity Name </label>
                  <input
                    className="form-control"
                    type="number"
                    name={`activityDuration${props.num}`}
                    required
                  />
                  <label>Activity Duration </label>
                  <input
                    className="form-control"
                    type="text"
                    name={`activityTags${props.num}`}
                    required
                  />
                  <label>Activity Tags (Seperate by space): </label>
                  <input
                    className="form-control"
                    type="text"
                    name={`category${props.num}`}
                    required
                  />
                  <label>Category: </label>
                  <input
                    className="form-control"
                    type="text"
                    name={`imageUrl${props.num}`}
                    required
                  />
                  <label>Image URL: </label>
    </div>)

export const AddSingleDate = props => (
        <div className="input-group date" id={`datetimepicker${props.num}`}>
          <input
            type="datetime-local"
            className="form-control"
            name="date0"
            required
          />
        </div>
)


export const makeAvailabilityArray = (target, num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(target[`date${i}`].value);
  }
  console.log("arr", arr);
  return arr;
}


export const makeActivityArray = (target, num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({
      name: target[`activityName${i}`].value,
      duration: target[`activityDuration${i}`].value,
      tags: target[`activityTags${i}`].value.split(" "),
      category: target[`category${i}`].value,
      imageUrl: target[`imageUrl${i}`].value,
      active: true,
    });
  }
  console.log("actarr", arr);
  return arr;
}

