import React, { Component } from 'react'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'


class UpdateableItem extends React.PureComponent {
  render(){
    return (      
        <div className="small-12 medium-6 columns chart-box">
          <div className="small-5 medium-5 large-4 columns">
            <img src={this.props.avatarURL} alt="PicItem"/>
          </div>
          <div className="small-7 medium-7 large-8 columns">
            <h3>{this.props.text}</h3>
                     
              { this.props.status === 1 ?
                      <p className="desc"> On Available</p> :
                      <p className="desc" style={{color:"red"}}>SOLD OUT</p>
                    }
            
            <p className="price">{this.props.prize}<span>THB</span></p>
            <p className="transaction">REF:{this.props.dbkey}</p>
            <span className="panael">
              <Link to="#" onClick={()=> this.props.hell(this.props.dbkey)}><i className="fa fa-trash"><br/><p>Tash</p></i></Link>
              <Link to={'/item/'+this.props.dbkey }><i className="fa fa-eye"><br/><p>View</p></i></Link>
            </span>
          </div>
        </div>
    );
  }
}

class Cart extends Component {
  constructor () {
    super();
    this.state = {
      items: [],
      User: '',
    };
    this.dbItems = firebase.database().ref().child('items');
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
        if (user) {
        this.setState({
        User: user.email
        })}
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

  removeItem(key){
    this.dbItems.child(key).remove();
  }
  
  render() {
    var _this = this;
    return (
      <div className="small-12 large-6 columns admin-chart">
        {this.state.items.map((item) => {
          return ( 
        <div key={ item['.key'] }>
          <UpdateableItem   dbkey={item['.key']} hell={this.removeItem} {...item} />
        </div>
          );
        })}
      </div>
    );
  }
}


export default Cart