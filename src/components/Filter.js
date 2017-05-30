import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import Home from './Home'


class Category extends Component {
  render(){
    return (        
        <Link to='/' onClick={() => this.props.Triggered(this.props.dbkey)} >
              <i className={"fa " + this.props.icon}></i>
              <p className="show-for-large">{this.props.text}</p>
        </Link>
    );
  }
}

class Categories extends Component {
  constructor () {
    super();
    this.state = {
      categories: [],
      fiiterID: '',
    };
    this.dbItems = firebase.database().ref().child('category');
  }

  componentDidMount() {
    this.dbItems.on('value', dataSnapshot => {
      let categories = [];
      dataSnapshot.forEach( childSnapshot => {
        let category = childSnapshot.val();
        category['.key'] = childSnapshot.key;
        categories.push(category);
      });

      this.setState({
        categories: categories
      });
    });
  }

  componentWillUnmount() {
    this.dbItems.off();
  }

  // this.setState({filterID: e}, function () {
  //   alert(this.state.filterID);
  //  });
  Triggered = (e) =>{
    this.setState({filterID: e})
  }

  Null = () => {
    this.setState({filterID: null})
  }



  render() {

    return (

        <div className="row">
          <div className="home-cat fuck">
            <ul>
              <li className='catlist active' >
                <Link to='/' onClick={this.Null} >
                    <i className="fa fa-clock-o"></i>
                    <p className="show-for-large">Last Time</p>
                </Link>
              </li>
              {this.state.categories.map((category) => {
                return ( 
                  <li key={ category['.key'] } className='catlist' >
                    <Category dbkey={category['.key']} {...category} Triggered={this.Triggered} />
                  </li>
                );
              })}
            </ul>
          </div>
            <Home filterKey={this.state.filterID || null}/>
        </div>

    );
  }
}


export default Categories