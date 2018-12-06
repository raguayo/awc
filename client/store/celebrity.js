import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_CELEBRITIES = 'GET_ALL_CELEBRITIES';
const GET_CELEBRITY = 'GET_CELEBRITY';
const REMOVE_CELEBRITY = 'REMOVE_CELEBRITY';
const EDIT_CELEBRITY = 'EDIT_CELEBRITY';
const ADD_CELEBRITY = 'ADD_CELEBRITY';

/**
 * INITIAL STATE
 */
const initialState = {
  celebrities: [],
  celebrity: {},
};

/**
 * ACTION CREATORS
 */
const getCelebrity = celebrity => ({ type: GET_CELEBRITY, celebrity });
const addCelebrity = celebrity => ({ type: ADD_CELEBRITY, celebrity });
const editCelebrity = celebrity => ({ type: EDIT_CELEBRITY, celebrity });
const removeCelebrity = celebrity => ({ type: REMOVE_CELEBRITY, celebrity });
const getCelebrities = celebrities => ({ type: GET_ALL_CELEBRITIES, celebrities});

/**
 * THUNKS
 */
export const editCeleb = celeb => dispatch => {
  axios
    .put(`/api/celebrities/${celeb.id}`, celeb)
    .then(res => {
      dispatch(editCelebrity(res.data));
    })
    .catch(console.error('we could not edit celebrity properly'));
};

export const deleteCeleb = celeb => dispatch => {
  axios
    .put(`/api/celebrities/${celeb.id}`, {
      active: false,
    })
    .then(res => {
      console.log('deleted');
      dispatch(removeCelebrity(res.data));
    })
    .catch(console.error('we were unable to delete the celebrity properly'));
}

//waiting for raj changes
export const postCeleb = (celeb, activities) => dispatch =>
  axios
    .post('/api/celebrities', celeb)
    .then(res => {
      dispatch(addCelebrity(res.data));
      return res.data;
    })
    .then(newCeleb => {
      let celebAvailabilities = [];

    activities.forEach(activity => {
        axios
          .post('/api/activities', activity)
          .then(res => {
            axios
              .post('/api/celebtivities', {
                activityId: res.data.id,
                celebrityId: newCeleb.id,
              })
          })

      })

    })
    .catch(err => console.log(err));

export const fetchCeleb = id => dispatch =>
  axios
    .get(`/api/celebrities/${id}`)
    .then(res => {
      dispatch(getCelebrity(res.data));
    })
    .catch(err => console.log(err));

export const fetchCelebs = () => dispatch =>
  axios
    .get('/api/celebrities')
    .then(res => {
      dispatch(getCelebrities(res.data));
    })
    .catch(console.log('we could not fetch all celebrities properly'));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CELEBRITY:
      return Object.assign({}, state, { celebrity: action.celebrity });
    case ADD_CELEBRITY:
      return Object.assign({}, state, { celebrity: action.celebrity });
    case REMOVE_CELEBRITY:
      return Object.assign({}, state, {
        celebrities: [
          ...state.celebrities.filter(
            celebrity => celebrity.id !== action.celebrity.id
          )
        ]
      });
    case GET_ALL_CELEBRITIES:
      return Object.assign({}, state, { celebrities: action.celebrities });
    default:
      return state;
  }
}
