import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'


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

class FilterItem extends Component {
  constructor () {
    super();
    this.state = {
      categories: [],
      fiiterID: '',
      isActive: null,
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
    this.setState({ isActive: e })
  }

  Null = () => {
    this.setState({filterID: null})
    this.setState({ isActive: null })
  }



  render() {

    return (

        <div className="row">
          <div className="home-cat fuck">
            <ul>
              <li className={"catlist " + (this.state.isActive === null  && 'active')} >
                <Link to='/' onClick={this.Null} >
                    <i className="fa fa-clock-o"></i>
                    <p className="show-for-large">Last Time</p>
                </Link>
              </li>
              {this.state.categories.map((category) => {
                return ( 
                  <li key={ category['.key'] } className={"catlist " + (this.state.isActive === category['.key']  && 'active')} >
                    <Category dbkey={category['.key']} {...category} Triggered={this.Triggered} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

    );
  }
}


export default FilterItem