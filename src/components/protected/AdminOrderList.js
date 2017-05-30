import React from 'react'
import * as firebase from 'firebase'

let n = 0

class AdminOrder extends React.Component {
  state={
    lasttime:'',
  }
  componentDidMount() {
     firebase.database().ref().child('items').child(this.props.dbkey).child('History')
        .on('value', dataSnapshot => {
        let test = dataSnapshot.numChildren()
        dataSnapshot.forEach( childSnapshot => {
          let item = childSnapshot.val();
          item['.key'] = childSnapshot.key
          if(item.auctround === test) {
          let Finish = item.time
          this.setState({lasttime:Finish})
           }
          })
          })
        } 

  render(){
    return (
      <tr>
        <th>{this.props.status}</th>
        <th>{n}</th> 
        <th>{this.props.dbkey}</th>
        <th>{this.props.text}</th>
        <th>{this.props.User}</th>
        <th>Aliquid eius, incidunt ipsam minima. Aperiam quod cum,beatae</th> 
        <th>{this.state.lasttime}</th>
        <th>{this.props.prize}</th>
        <th>THB.</th>
      </tr>
    )
  }
}


class AdminOrderList extends React.Component {
    constructor () {
    super();
    this.state = {
      orders: [],
    }}

    componentDidMount() {
    let dbcarts = firebase.database().ref().child('items');
        dbcarts.on('value', dataSnapshot => {
      let orders = [];
      dataSnapshot.forEach( childSnapshot => {
        let order = childSnapshot.val()
        order['.key'] = childSnapshot.key
        if (order.status === 0){
          orders.push(order)   
          }  
      })
      this.setState({
        orders: orders
      })
    })
    }

  render() {
    return (
      <div style={{marginLeft:50}}>
      <h2>OrderList</h2>
      <div>to Logistic Process</div>
        <hr/>
        <table>
            <tbody>
                <tr>
                    <th>Status</th>
                    <th>No</th> 
                    <th>REF.</th>
                    <th>Item Name</th>
                    <th>User Name</th>
                    <th>Address</th> 
                    <th>Finish Auction</th>
                    <th>Price</th>
                    <th>Cur.</th>
                </tr>
                {this.state.orders.map((order) => {
                n = n + 1
                return ( 
                    <AdminOrder key={ order['.key'] } dbkey={ order['.key'] } {...order} />
                )})}
            </tbody>
        </table>
      </div>
    )
  }
}
export default AdminOrderList