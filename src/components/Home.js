import React, { Component } from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'
import Clock from './Clock.js'
//import RealClock from './Clocking.js'
//import fetch from 'isomorphic-fetch'


class UpdateableItem extends React.Component {

  state ={
    icon:'',
  }

  componentDidMount(){
    let categoryRef = firebase.database().ref().child('items').child(this.props.dbkey).child('categories')
    categoryRef.once('value', snap => {
      let category = snap.val()
      let iconRef = firebase.database().ref().child('category').child(category).child('icon')
      iconRef.once('value', snapshot => {
        this.setState((state) => {state.icon = snapshot.val()})
      })
    })
  }

  render(){
    return this.props.status === 1 && (
      <div className="small-6 medium-4 large-3 columns post-box">
        <Link to={'/item/'+this.props.dbkey } target="_blank">
          <div className="post-box-top">
            <img src={this.props.avatarURL} alt=""/>
          </div>
          <div className="post-box-content">
            <h3>{this.props.text}</h3>
            <p className="desc">{this.props.desc}</p>
            {
            this.props.status === 1 ?
              <Clock {...this.props} /> :
              <span className="timecount red">0:00:00</span> 
            }
            <p className="price">{this.props.prize}<span className="curentcy">Bath</span></p>
            <button><i className={"fa " + this.state.icon + " fa-2x"}></i></button>
          </div>
        </Link>
      </div>
    ) 
  }
}

class Home extends Component {
  constructor () {
    super();
    this.state = {
      items: [],
      filterKey: null,
      APItime: [],
    }
    this.dbItems = firebase.database().ref().child('items')
  }


  componentWillReceiveProps(newProps) {
    this.setState({ filterKey: newProps.filterKey })
    this.dbItems.on('value', dataSnapshot => {
      let items = [];
      dataSnapshot.forEach( childSnapshot => {
        let item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        if (newProps.filterKey === null )
        items.push(item)
        else if(item.categories === newProps.filterKey )
        items.push(item)
      });

      this.setState({
        items: items
      });
    });
 }

  componentDidMount() {
    this.dbItems.on('value', dataSnapshot => {
      let items = [];
      dataSnapshot.forEach( childSnapshot => {
        let item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item)
      });

      this.setState({
        items: items
      });
    });
  }

  componentWillUnmount() {
    this.dbItems.off();
  }
  
  render() {
    return (
        <div className="row">
          <div className="small-12 columns post-feed">
            {this.state.items.map((item) => {
              return ( 
            <div key={ item['.key'] }>
              <UpdateableItem   dbkey={item['.key']}  {...item} />
            </div>
              );
            })}
          </div>
        </div>
    );
  }
}


export default Home