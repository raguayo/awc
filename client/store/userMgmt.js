import axios from 'axios';
import history from '../history';
import store from './';

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';
const GET_SELECTED_USER = 'GET_SELECTED_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_ADMIN_ACCESS = 'UPDATE_ADMIN_ACCESS';
const UPDATE_CHANGE_PASSWORD = 'UPDATE_CHANGE_PASSWORD';

/**
 * INITIAL STATE
 */
const defaultUserMgmt = {
  users: [],
  selectedUser: {},
};

/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users });
const getSelectedUser = selectedUser => ({ type: GET_SELECTED_USER, selectedUser });
const removeUser = id => ({ type: REMOVE_USER, id });
const updateAdminAccess = user => ({ type: UPDATE_ADMIN_ACCESS, user });
const updateChangePassword = user => ({ type: UPDATE_CHANGE_PASSWORD, user});

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
    .then(res => dispatch(getUsers(res.data)))
    .catch(err => console.log(err));

export const fetchSelectedUser = userId => dispatch =>
  axios.get(`/api/users/${userId}`)
    .then(res => res.data)
    .then(user => {
      dispatch(getSelectedUser(user));
      history.push(`/users/${userId}`)
    })
    .catch(err => console.error(err));

export const deleteUser = id => dispatch => {
  axios.delete(`/api/users/${id}`)
    .then(() => {
      dispatch(removeUser(id));
      history.push('/users');
    })
    .catch(err => console.error(err));
};

export const grantAdminAccess = id => dispatch => {
  axios.put(`/api/users/${id}`, { isAdmin: true })
    .then(res => res.data)
    .then(user => {
      dispatch(updateAdminAccess(user));
      history.push(`/users/${id}`);
    })
    .catch(err => console.error(err));
}

export const revokeAdminAccess = id => dispatch => {
  axios.put(`/api/users/${id}`, { isAdmin: false })
    .then(res => res.data)
    .then(user => {
      dispatch(updateAdminAccess(user));
      history.push(`/users/${id}`);
    })
    .catch(err => console.error(err));
}

export const setResetPasswordFlag = id => dispatch => {
  axios.put(`/api/users/${id}`, { needsPasswordReset: true })
    .then(res => res.data)
    .then(user => {
      dispatch(updateChangePassword(user));
      dispatch(updateAdminAccess(user));
      history.push('/login');
    })
    .catch(err => console.error(err));
}

/**
 * REDUCER
 */
export default function (prevState = defaultUserMgmt, action) {
  const nextState = Object.assign({}, prevState);
  switch (action.type) {
    case GET_USERS:
      nextState.users = action.users;
      return nextState;
    case GET_SELECTED_USER:
      nextState.selectedUser = action.selectedUser;
      return nextState;
    case UPDATE_ADMIN_ACCESS:
      nextState.selectedUser = action.user;
      return nextState;
    case UPDATE_CHANGE_PASSWORD:
      nextState.selectedUser = action.user;
      nextState.user = action.user;
      return nextState;
    case REMOVE_USER:
      nextState.users = store.getState().userMgmt.users.filter(user => {
        return (action.id !== user.id);
      });
      return nextState;
    default:
      return prevState;
  }
}

