import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ACTIVITY = 'GET_ACTIVITY';
const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
const ADD_ACTIVITY = 'ADD_ACTIVITY';

/**
 * INITIAL STATE
 */
const initialState = {
    activities: [],
    activity: {},
};

/**
 * ACTION CREATORS
 */
const getActivity = activity => ({type: GET_ACTIVITY, activity});
const removeActivity = activity => ({type: REMOVE_ACTIVITY, activity});
const addActivity = activity => ({type: ADD_ACTIVITY, activity});
const getActivities = activities => ({type: GET_ALL_ACTIVITIES, activities});

//thunkypoo

export const fetchActivities = () => dispatch =>
    axios.get('/api/activities')
    .then(res => {
        dispatch(getActivities(res.data));
    })
    .catch(err => console.log(err));


export const fetchActivity = id => dispatch =>
    axios.get(`/api/activities/${id}`)
    .then(res => {
        dispatch(getActivity(res.data));
    })
    .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return Object.assign({}, state, {activity: action.activity});
    case GET_ALL_ACTIVITIES:
      return Object.assign({}, state, {activities: action.activities});
    case REMOVE_ACTIVITY:
      return Object.assign({}, state, {activities: [...state.activities.filter(activity => (activity.id !== action.activity.id))]});
    case ADD_ACTIVITY: 
      return Object.assign({}, state, {actibities: [...state.activities, action.activity]});
    default:
      return state;
  }
}
