import React from 'react'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'

class Cart extends React.Component {
  render(){
    return (
      <div className="small-12 medium-6 columns chart-box">
        <div className="small-5 medium-5 large-4 columns">
          <img src={this.props.avatarURL} alt="PicItem"/>
        </div>
        <div className="small-7 medium-7 large-8 columns">
          <h3>{this.props.text}</h3>
          <p className="desc">{this.props.desc}</p>
          <p className="price">{this.props.prize}<span>THB</span></p>
          <p className="transaction">REF:{this.props.dbkey}</p>
        </div>
      </div>
    );
  }
}

class MyCart extends React.Component {
    constructor () {
    super();
    this.state = {
      carts: [],
    }}

    componentDidMount() {
    let user = firebase.auth().currentUser
    let dbcarts = firebase.database().ref().child('items');
        dbcarts.on('value', dataSnapshot => {
      let carts = [];
      dataSnapshot.forEach( childSnapshot => {
        let cart = childSnapshot.val()
        cart['.key'] = childSnapshot.key
        if(cart.Winner === user.email){
         carts.push(cart)
        }
      })
      this.setState(
        (state) => {state.carts = carts}
      );
    })
  }

  render() {
    return (
      <div className="row">
        <div className="small-12 large-11 small-centered columns h-continer">
          <div className="small-12 columns profile-main">
            <div className="small-12 columns">
              <h1>My Cart</h1>
              <p>Your Cart - Payment Pending</p>
              <div className="hr-text-center"><hr/></div>
            </div>
          </div>
          <div className="small-12 columns chart-main">
            {this.state.carts.map((cart) => {
                    return ( 
                      <Cart key={cart['.key']} dbkey={cart['.key']}  {...cart} />
                    );
                  })}
            <div className="small-12 medium-6 small-centered chart-btn">
              <Link to="/orderlist" className="button success">Checkout</Link>
            </div>
            <p className="chart-footer">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa autem sapiente et exercitationem! Nostrum dolores, voluptates. Fuga enim consectetur quae, quibusdam aspernatur sunt nobis, aperiam fugiat animi earum. Alias, ducimus.<br/></p>

            <p className="chart-footer"><i className="fa fa-truck fa-5x"></i></p><br/>

          </div>
        </div>
      </div>
    )
  }
}
export default MyCart