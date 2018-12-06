import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_CELEBTIVITIES = 'GET_ALL_CELEBTIVITIES';
const GET_CELEBTIVITY = 'GET_CELEBTIVITY'
const EDIT_CELEBITIVITIES = 'EDIT_CELEBTIVITIES'

/**
 * INITIAL STATE
 */
const initialState = {
  celebtivities: [],
  celebtivity: {},
};

/**
 * ACTION CREATORS
 */

const getCelebtivities = celebtivities => ({ type: GET_ALL_CELEBTIVITIES, celebtivities });
const getCelebtivity = celebtivity => ({ type: GET_CELEBTIVITY, celebtivity });
//const editCelebtivities = celebtivities => ({ type: EDIT_CELEBTIVITY, celebtivities });

//thunkypoo
export const editCelebtivities = (celeb, deleteTheseActivities, addTheseActivities) => dispatch => {
  axios.put(`/api/celebrities/${celeb.id}`, celeb)
  .catch(err => console.log(err));

  deleteTheseActivities.forEach(activity => {
    axios.delete(`/api/celebtivities/${celeb.id}/${activity.id}`)
    .then(() => {
      //axios.put(`/api/activities/${activity.id}`, activity)
    })
    .catch(err => console.log(err));
  })

  addTheseActivities.forEach(activity => {
    axios.post('/api/activities', activity)
    .then(res => {
      return axios.post('/api/celebtivities', {
        celebrityId: celeb.id,
        activityId: res.data.id,
      })
    })
    .catch(err => console.log(err));
  })

}

export const fetchCelebtivities = () => dispatch =>
  axios.get('/api/celebtivities')
    .then(res => {
      dispatch(getCelebtivities(res.data));
    })
    .catch(err => console.log(err));

export const fetchCelebtivity = celebtivityId => dispatch =>
  axios.get(`/api/celebtivities/${celebtivityId}`)
    .then(res => {
      dispatch(getCelebtivity(res.data));
    })
    .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CELEBTIVITIES:
      return Object.assign({}, state, {celebtivities: action.celebtivities});
    case GET_CELEBTIVITY:
      return Object.assign({}, state, {celebtivity: action.celebtivity});
    default:
      return state;
  }
}
