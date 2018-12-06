import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const GET_ALL_CARTS = 'GET_ALL_CARTS';
const RESET_PASSWORD = 'RESET_PASSWORD';
const REMOVE_USER = 'REMOVE_USER';
/**
 * INITIAL STATE
 */
const defaultUser = {
  orders: [],
  carts: [],
};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const getAllCarts = carts => ({ type: GET_ALL_CARTS, carts });
const resetPassword = user => ({ type: RESET_PASSWORD, user});
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
      })
      .catch(err => console.log(err));



export const auth = (email, password, method, firstName, lastName) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, firstName, lastName })
      .then(res => {
        let user = res.data;
        dispatch(getUser(user));
        if(user.needsPasswordReset) {
          history.push('/reset-password');
        } else if (user.isAdmin) {
          history.push('/users');
        } else {
          history.push('/home');
        }
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser());
        history.push('/login');
      })
      .catch(err => console.log(err));

export const fetchCarts = () =>
  dispatch =>
    axios.get('/api/cart')
      .then(res => {
        dispatch(getAllCarts(res.data));
      })
      .catch(err => console.log(err));

export const updatePassword = user => dispatch => {
  axios.put(`/api/users/${user.id}`, {password: user.password, needsPasswordReset: false})
    .then(res => res.data)
    .then(user => {
      dispatch(resetPassword(user));
      history.push('/home');
    })
    .catch(err => console.error(err));
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      console.log('user.js - reducer - state: ', state);
      return Object.assign({}, state, { isLoggedIn: false });
    case GET_ALL_CARTS:
      return Object.assign({}, state, { carts: action.carts });
    default:
      return state;
  }
}
