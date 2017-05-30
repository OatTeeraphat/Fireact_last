import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout , login , resetPassword  } from '../../helpers/auth'
import { firebaseAuth } from '../../config/constants'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}


export default class Header extends Component {
  state = {
    authed: false,
    loading: true,
    User: "Guest",
    loginMessage: null
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

  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }

  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }

  componentWillUnmount () {
    this.removeListener()
  }
  
  render() {
    return  (
          <header>
            <div className="title-bar" style={{width:"100%"}} >
              <div className="row">
                <div className="title-bar-left nav-left">
                  <Link to="/" id="a-cart"><h1><i className="fa fa-gavel fa-1x"></i> AUCT</h1></Link>
                  <div className="nav-toggle-btn"></div>
                </div>

                <div className="title-bar-right nav-right">
                  <Link to="/cart" id="a-cart">
                  <span data-tooltip aria-haspopup="true" className="has-tip bottom" data-disable-hover="false" tabIndex="2" title="Your Cart!">
                      <i className="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
                  </span>
                  </Link>
                  <b className="alert-top-btn" id="b-cart"></b>
                  
                {this.state.authed ?
                    <div className="profile-circle" >
                      <Link to="#" className="profile-botton">
                        <span data-tooltip aria-haspopup="true" className="has-tip bottom" data-disable-hover="false" tabIndex="1" title="Your Profile!">
                          <img src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p160x160/10590625_870609506283335_1688425455264656623_n.jpg?oh=29b4ec66619473227bed4d94f03a55e4&oe=59A32BD3" alt="" />
                        </span>
                      </Link>

                      <div className="profile-dropdown" id="d-profile">
                          {this.state.User === "admin@admin.com" ?
                            <ul>
                              <li><Link to="/">{this.state.User}</Link></li>
                              <li><Link to="/admin/item">Add Item</Link></li>
                              <li><Link to="/admin/category">Add Catagory</Link></li>
                              <li><Link to="/" onClick={() => {logout()}} >Logout !!</Link></li>
                            </ul>
                          :
                            <ul>
                              <li><Link to="/">{this.state.User}</Link></li>
                              <li><Link to="/" onClick={() => {logout()}} >Logout !!</Link></li>
                            </ul>

                          }

                      </div>
                    </div>

                  : <Link to="#" className="button success" id="btn-login" data-open="modalSign" aria-controls="modalSign" aria-haspopup="true" tabIndex="0">
                    LOGIN</Link>
                }
                </div>
              </div>
            </div>

            <div ref="modal" id="modalSign" className="reveal" data-reveal="5ihcc8-reveal" role="dialog" aria-hidden="false" data-yeti-box="modalSign" data-resize="modalSign" tabIndex="-1" >
              <div className="row">
                  <div className="small-10 large-11 small-centered">
                    <div className="small-12 columns">
                       <Link className="button facebook" to="#">Continue by Facebook</Link>
                       <div className="hr-text-center">
                        <hr/><p className="title">OR</p>
                       </div>
                    </div>
                     {
                        this.state.loginMessage &&
                         <div className="small-12 columns">
                          <div className="alert callout">
                            <p><i className="fi-alert"></i>{this.state.loginMessage}</p>
                            <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>

                          </div>
                         </div>

                     }
                  <form data-abide noValidate onSubmit={this.handleSubmit} >
                        <div className="small-12 columns">
                          <label>
                            <input type="text" ref={(email) => this.email = email} placeholder="E-mail Address" aria-describedby="help-signup" required pattern="email" />
                            <span className="form-error">Yo, email's required correct form !!</span>
                          </label>
                        </div>
                        <div className="small-12 columns">
                          <label>
                            <input type="password" ref={(pw) => this.pw = pw} id="password" pattern=".{5,}" placeholder="Password" aria-describedby="help-signup" required />
                            <span className="form-error">I'm required! @ 5 Character</span>
                        </label>
                        </div>
                        <div className="small-12 columns">
                          <input id="remember" type="checkbox"/><label htmlFor="checkbox1">Remember Me Pls.</label>
                          <br/>
                          <button className="button success" type="submit">Login !!</button>
                        </div>
                  </form>
                    <div className="small-12 columns">
                        <div className="hr-text-center">
                        <hr/>
                      </div>
                    </div>
                      <div className="small-12 medium-8 columns">
                        <p className="signup">If You Need an Account ?</p>
                      </div>
                      <div className="small-12 medium-4 columns">
                        <Link className="hollow button" to="/register" data-close="">Sign Up</Link>
                      </div>
                </div>
              </div>
              <Link to="#"className="close-button" data-close="">&#215;</Link>
            </div>

        </header>
    );
  }
}