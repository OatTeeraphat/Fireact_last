import React from 'react'
import * as firebase from 'firebase'


class Order extends React.Component {
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
        <td>{this.props.status === 0?
        		<i className="fa fa-check-circle fa-2x" style={{color:'green'}}></i>
        	:
        		<i className="fa fa-times-circle fa-2x" style={{color:'red'}}></i>
        	}</td>
        <td>{this.props.dbkey}</td>
        <td>{this.props.text}</td>
        <td>{this.props.User}</td>
        <td>Aliquid eius, incidunt ipsam minima. Aperiam quod cum,beatae</td> 
        <td>{this.props.prize}</td>
        <td>THB.</td>
      </tr>
    )
  }
}


class Orderlist extends React.Component {
    constructor () {
    super();
    this.state = {
      orders: [],
    }}

    componentDidMount() {
    let user = firebase.auth().currentUser
    let dbcarts = firebase.database().ref().child('items');
        dbcarts.on('value', dataSnapshot => {
      let orders = [];
      dataSnapshot.forEach( childSnapshot => {
        let order = childSnapshot.val()
        order['.key'] = childSnapshot.key
        if (order.status === 0){
          if(order.Winner === user.email){
          orders.push(order)   
          }}
      })
      this.setState({
        orders: orders
      })
    })
    }

  render() {
    console.log()
    return (
	<div className="row">
		<div className="small-12 small-centered">
			<div className="small-12 columns admin-chart">
				<div className="small-12 columns">
					<div className="small-12 columns profile-main">
						<div className="small-12 columns">
							<h1>Order List</h1>
							<p>to Logistic Process</p>
							<div className="hr-text-center"><hr/></div>
						</div>
					</div>
					<div className="row">
					  <div className="small-12 small-centered columns">
						    <div className="table table-list">
						        <table>
						            <tbody>
						                <tr>
						                    <th>Status</th>
						                    <th width="200">REF.</th>
						                    <th width="200" >Item Name</th>
						                    <th width="175" >User Name</th>
						                    <th>Address</th> 
						                    <th className="text-right" >Price</th>
						                    <th>Cur.</th>
						                </tr>
						                {this.state.orders.map((order) => {
						                return ( 
						                    <Order key={ order['.key'] } dbkey={ order['.key'] } {...order} />
						                )})}
						            </tbody>
						        </table>
						    </div>
					  </div>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
  }
}
export default Orderlist