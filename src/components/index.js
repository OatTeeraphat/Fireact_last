import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from './User/Login'
import Register from './User/Register'
import MyCart from './MyCart'
import Orderlist from './Orderlist'
import Filter from './Filter'
import Header from './wrapper/Header'
import Footer from './wrapper/Footer'
import Categorylist from './protected/categories/Categorylist'
import Configitem from './protected/Configitem'
import Item from './Item/Item'
import { firebaseAuth } from '../config/constants'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  )
}

function AdminRoute ({component: Component, User, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => User === "admin@admin.com"
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default class App extends Component {
  
  state = {
    authed: false,
    loading: true,
    User: "Guest"
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          User: user.email
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          User: "Guest"
        })
      }
    })
  }


  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? 
      <div className="loader-img">
        <img src="http://localhost:3000/img/preloader2.gif" alt="Loader Icon" />
      </div> 

    : (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route path='/' exact component={Filter} />
            <PublicRoute authed={this.state.authed} path='/item/:itemId' component={Item} />
            <PublicRoute authed={this.state.authed} path='/login' component={Login} />
            <PublicRoute authed={this.state.authed} path='/register' component={Register} />
            <PrivateRoute authed={this.state.authed} path='/cart' component={MyCart} />
            <PrivateRoute authed={this.state.authed} path='/orderlist' component={Orderlist} />
            <AdminRoute User={this.state.User} path='/admin/category' component={Categorylist} />
            <AdminRoute User={this.state.User} path='/admin/item' component={Configitem} />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

