import React from 'react';
import { Card, CardTitle } from 'react-materialize';
import { NavLink } from 'react-router-dom';


const defaultActivity = {
  name: 'No Activity name',
  duration: 1,
  imageUrl: 'image not found',
  category: 'Fun',
  tags: ['fun', 'code'],
  location: [0.00, 0.00],
  active: true,
};

const SingleActivity = (props) => {

  const activity = props.activity || defaultActivity;

  return (
    <div className="col s6 m4 l2" style={{marginBottom: '1em'}}>
      <NavLink to={`activities/${activity.id}`}><img src={activity.imageUrl} style={{height: '340px', width: '100%', margin: 'auto'}}></img></NavLink>
      <NavLink to={`activities/${activity.id}`}><p style={{margin: '0em', textAlign: 'center', color: 'black'}}><b><i>{activity.name}</i></b></p></NavLink>
    </div>
  );
};

export default SingleActivity;
