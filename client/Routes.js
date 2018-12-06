import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import AllCelebrities from './components/Celebrities/AllCelebrities';
import SingleCelebrityPage from'./components/Celebrities/SingleCelebrityPage';
import AllActivities from './components/Activities/AllActivities';
import SingleActivityPage from './components/Activities/SingleActivityPage';
import { Main, Login, Signup, UserHome, CelebList, Celeb, AddCelebrity, EditCelebrity, OrdersList, CartList, Celebtivity, ManageUsers, SelectedUser, ResetPassword, About } from './components';


import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {

    const { isLoggedIn, isAdmin } = this.props;
    // console.log('In Routes.js - isLoggedIn: ', isLoggedIn, '\n isAdmin: ', isAdmin);


    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={About} />
            <Route exact path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/celebrities" component={AllCelebrities} />
            <Route exact path="/activities" component={AllActivities} />
            <Route exact path="/activities/:id" component={SingleActivityPage} />
            <Route exact path="/celebrities/:id" component={SingleCelebrityPage} />
            <Route exact path="/cart" component={CartList} />
            {
              isLoggedIn ? isAdmin ?
                (<Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={About} />
                  <Route exact path="/users" component={ManageUsers} />
                  <Route exact path="/users/:id" component={SelectedUser} />
                  <Route path="/add-celebrity" component={AddCelebrity} />
                  <Route path="/edit/:id" component={EditCelebrity} />
                </Switch>) :
                (<Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/reset-password" component={ResetPassword} />
                  <Route path="/home" component={About} />
                  <Route exact path="/orders" component={OrdersList} />
                  <Route exact path="/celebtivities/:id" component={Celebtivity} />
                </Switch>) :
                null
            }
            <Route component={Login} />

          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
