import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import celeb from './celebrity';
import celebtivities from './celebtivities';
import userMgmt from './userMgmt';
import celebrity from './celebrity';
import activity from './activity';
import purchases from './purchases';

const reducer = combineReducers({user, celeb, userMgmt, celebtivities, celebrity, activity, purchases});
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './celebrity';
export * from './celebtivities';
export * from './userMgmt';
export * from './purchases';
