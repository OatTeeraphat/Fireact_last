import React, { Component } from 'react'
import { auth } from '../../helpers/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
    this.props.history.push('/')
  }
  render () {
    return (
        <div className="small-12 medium-6 large-4 small-centered ">
          <div className="admin-login-wraper">
            <div className="admin-login">
              <div className="row">
                  <div className="small-10 large-11 small-centered">
                    <div className="title-bar-left nav-left">
                      <h1><i className="fa fa-gavel fa-1x"></i> AUCT</h1>
                      <div className="nav-toggle-btn"></div>
                    </div>

                  {
                  this.state.registerError &&
                  <div className="small-12 columns">
                      <div className="alert callout">
                        <p><i className="fi-alert"></i> There are some errors in your form.</p>
                      </div>
                  </div>
                  }

                  <form data-abide noValidate onSubmit={this.handleSubmit} >
                        <div className="small-12 columns">
                          <label>
                            <input type="text" ref={(email) => this.email = email} placeholder="E-mail Address" aria-describedby="help-signup" required pattern="email"/>
                            <span className="form-error">Yo, email's required correct form !!</span>
                          </label>
                        </div>
                        <div className="small-12 columns">
                          <label>
                            <input type="text" placeholder="Username" aria-describedby="help-signup" required pattern="text"/>
                            <span className="form-error">Helpp, You did't Have Your Name !!</span>
                          </label>
                        </div>
                        <div className="small-12 columns">
                          <label>
                            <input type="password" ref={(pw) => this.pw = pw} id="password" pattern=".{5,}" placeholder="Password" aria-describedby="help-signup" required />
                            <span className="form-error">I'm required! @ 5 Character</span>
                        </label>
                        </div>
                        <div className="small-12 columns">
                          <button className="button success" type="submit" value="Submit">Join Up !!</button>
                        </div>
                  </form>

                    <div className="small-12 columns">
                          <div className="hr-text-center">
                          <hr/>
                        </div>
                    </div>
                    {this.state.authed 
                      ? <div className="small-12">
                          <div className="small-12 medium-8 columns">
                            <p className="signup" style={{textAlign:"left"}} >You Already Login !! </p>
                          </div>
                          <div className="small-12 medium-4 columns">
                            <button to="/" className="hollow button">Feed</button>
                          </div>
                        </div>

                      : 
                        <div className="small-12">
                          <div className="small-12 medium-8 columns">
                            <p className="signup" style={{textAlign:"left"}} >If You Have an Account ?</p>
                          </div>
                          <div className="small-12 medium-4 columns">
                            <button to="" className="hollow button" data-open="modalSign" aria-controls="modalSign" aria-haspopup="true" tabIndex="0">Log In</button>
                          </div>
                        </div>
                    }
         
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
