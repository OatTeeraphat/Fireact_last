import React, { Component } from 'react'
import Categories from './Categories'
import * as firebase from 'firebase'

// ToDo = Change Home to PureComponent
class CategoryList extends Component {
  state = {
      newitemtext : '', 
      icon: '',
  }

  handleNewItemSubmit = (e) => {
    e.preventDefault();
    if (this.state.newitemtext && this.state.newitemtext.trim().length !== 0) {
      firebase.database().ref().child('category').push({
        text: this.state.newitemtext,
        allitem: 0,
        avaliableitem: 0,
        remainitem: 0,
        icon: this.state.icon,
      })
      this.setState({
        newitemtext: '',
      })
    }
  }

  onNewItemChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (

        <div className="row">
          <div className="small-11 meduim-8 large-12 small-centered">
            <div className="small-12 large-6 columns">
              <div className="small-12 columns profile-main">
                <div className="small-12 columns">
                  <h1>Catagories</h1>
                  <p>for Product</p>
                  <div className="hr-text-center"><hr/></div>
                </div>
              </div>
              <form data-abide noValidate onSubmit={ this.handleNewItemSubmit }>
                <div className="small-9 columns">
                    <label>Product Name
                      <input type="text" placeholder="Product Name" aria-describedby="help-signup" required pattern="text" id="p_name" name="newitemtext"  value={ this.state.newitemtext } onChange={ this.onNewItemChange } />
                      <span className="form-error">Yo, Product name required!!</span>
                    </label>
                </div>
                <div className="small-3 columns">
                  <label>Icon
                    <select id="select" required onChange={ this.onNewItemChange } value={ this.state.icon } name="icon" >
                        <option value=''></option>
                        <option value="fa-home">&#xf015;</option>
                        <option value="fa-plug">&#xf1e6;</option>
                        <option value="fa-diamond">&#xf219;</option>
                        <option value="fa-bicycle">&#xf206;</option>
                        <option value="fa-cutlery">&#xf0f5;</option>
                        <option value="fa-ambulance">&#xf0f9;</option>
                        <option value="fa-anchor">&#xf13d;</option>
                        <option value="fa-android">&#xf17b; </option>
                        <option value="fa-angle-up">&#xf106;</option>
                        <option value="fa-apple">&#xf179; </option>
                        <option value="fa-archive">&#xf187; </option>
                        <option value="fa-area-chart">&#xf1fe;</option>
                        <option value="fa-asterisk">&#xf069; </option>
                        <option value="fa-at">&#xf1fa; </option>
                        <option value="fa-automobile">&#xf1b9; </option>
                        <option value="fa-backward">&#xf04a; </option>
                        <option value="fa-balance-scale">&#xf24e;</option>
                        <option value="fa-ban">&#xf05e; </option>
                        <option value="fa-bank">&#xf19c; </option>
                        <option value="fa-bar-chart">&#xf080;</option>
                        <option value="fa-bar-chart-o">&#xf080;</option>
                        <option value="fa-battery-full">&#xf240;</option>
                        <option value="fa-behance">&#xf1b4; </option>
                        <option value="fa-behance-square">&#xf1b5;</option>
                        <option value="fa-bell">&#xf0f3; </option>
                        <option value="fa-bell-o">&#xf0a2;</option>
                        <option value="fa-bell-slash">&#xf1f6;</option>
                        <option value="fa-bell-slash-o">&#xf1f7;</option>
                        <option value="fa-bicycle">&#xf206; </option>
                        <option value="fa-binoculars">&#xf1e5; </option>
                        <option value="fa-birthday-cake">&#xf1fd;</option>
                        <option value="fa-bitbucket">&#xf171; </option>
                        <option value="fa-bitbucket-square">&#xf172;</option>
                        <option value="fa-bitcoin">&#xf15a; </option>
                        <option value="fa-black-tie">&#xf27e;</option>
                        <option value="fa-bold">&#xf032; </option>
                        <option value="fa-bolt">&#xf0e7; </option>
                        <option value="fa-bomb">&#xf1e2; </option>
                        <option value="fa-book">&#xf02d; </option>
                        <option value="fa-bookmark">&#xf02e; </option>
                        <option value="fa-bookmark-o">&#xf097;</option>
                        <option value="fa-briefcase">&#xf0b1; </option>
                    </select>
                  </label>
                </div>
                <div className="small-12 columns admin-from-btm">
                  <button className="button success" type="submit" value="Submit">ADD Catagories</button>
                </div>
              </form>
            </div>
            <div className="small-12 large-6 columns admin-chart">
              <Categories/>
            </div>
          </div>
        </div>




    );
  }
}


export default CategoryList
