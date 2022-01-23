import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
//import Home from './components/Home';
import SpotifyData from './components/SpotifyData';
import Login from './components/SpotifyData/Login'
import {me} from './store'

const Routes = () => {

return (
  <Switch>
  <Route exact path="/" component={Login} />
  <Route path="/home" component={SpotifyData} />
  {/* <Route path="/login" component={Login} />
  <Route path="/signup" component={Signup} /> */}
  </Switch>
  )

}

export default Routes
