import React from 'react'
import Auctionlist from './Auctionlist'
import ViewClock from '../ViewClock'
import * as firebase from 'firebase'
import moment from 'moment'
moment().format();

class Item extends React.Component {
constructor () {
    super()
    this.state = {
      item: [],
      newprize: '',
      time: moment().format('MMMM DD YYYY, h:mm:ss a'),
      auctround: '',
      timetoauct: '',
      ReservePrize: '',
    }}
    
componentDidMount() {
  const itemRef =firebase.database().ref().child('items').child(this.props.match.params.itemId)
  itemRef.on("value", snapshot => {
  let getitem = snapshot.val();
  this.setState({item:getitem })
})}
  

componentWillUnmount() {
  firebase.database().ref().child('items').child(this.props.match.params.itemId).off();
}

Auction = (e) => {
    e.preventDefault();
    //if(firebase.auth().currentUser.email === this.state.item.ReserveUser){
    //  alert("Your bid at" + this.state.item.ReserveBid + "THB has been registered. You are currently the highest bidder." )
    //} else {
    if(this.state.newprize > this.state.item.prize){
        if (this.state.newprize && this.state.newprize.trim().length !== 0 ){
          firebase.database().ref().child('items').child(this.props.match.params.itemId).child('History').push({
          user: firebase.auth().currentUser.email,
          prize: this.state.newprize,
          time: this.state.time,
          auctround: this.state.item.auctround,
          ReservePrize:parseInt(this.state.item.prize, 10) + 10 ,
          })
            if(parseInt(this.state.newprize) > parseInt(this.state.item.ReserveBid)){
              firebase.database().ref().child('items').child(this.props.match.params.itemId).update({
              prize: parseInt(this.state.item.prize) + 10 ,
              timetoauct: 30,
              auctround: this.state.item.auctround + 1,
              ReserveBid: this.state.newprize,
              ReserveUser: firebase.auth().currentUser.email, })

             } 
            else { alert("Your bid has been registered. Unfortunately, an auto-bid from another user was higher than yours. Please try again... ") }
        }
      }
  }

 onNewPrizeChange = (e) => {
    this.setState({newprize: e.target.value});
  }

render() {
  return (
  <div className="row">
    <div className="small-12 large-11 small-centered columns">

      <div className="small-12 large-5 columns auct-l-container">
        <img src={this.state.item.avatarURL} alt="PicItem" />
      </div>

      <div className="small-12 large-7 columns auct-r-container">
        <div className="auct-content">
          <div className="row">
            <div className="small-12 medium-9 columns">
              <h1>{this.state.item.text}</h1>
              <p className="desc">{this.state.item.desc}</p>
            </div>
            <div className="small-12 medium-3 columns show-for-medium">
              <p className="price">{this.state.item.prize}<span className="curentcy">Bath</span></p>
              <div id="price-arrow"></div>
            </div>
          </div>
          <div className="row">
            <div className="small-6 medium-5 columns">
              <p className="time">Time Remaining<br/>
            {
            this.state.item.status === 1 ?
              <ViewClock dbkey={this.props.match.params.itemId} /> :
              <span className="timecount green">0:00:00</span>
            }
            </p>
            </div>
            <div className="small-6 columns show-for-small-only">
              <p className="price">{this.state.item.prize}<span className="curentcy">Bath</span></p>
            </div>
            <div className="small-12 medium-7 columns">
              <p className="time">Bid Your Offer</p>
                  { this.state.item.status === 1 ?
                        <form className="auct-form" data-abide noValidate onSubmit={this.Auction}>
                          <label>
                            <div className="input-group">
                              <span className="input-group-label">฿</span>
                              <input className="input-group-field" id="NumberInput" type="number" required pattern="number" onChange={ this.onNewPrizeChange } value={this.state.newprize}/>
                            </div>
                          </label>
                          <button className="button" type="submit" value="Submit"><i className="fa fa-gavel fa-1x"></i> Bid</button>
                        </form>
                  :  
                        <form className="auct-form">
                          <label>
                            <div className="input-group">
                              <span className="input-group-label">฿</span>
                              <input className="input-group-field" readOnly id="NumberInput" type="number" required pattern="number" onChange={ this.onNewPrizeChange } value={this.state.newprize}/>
                            </div>
                          </label>
                          <button className="button" type="submit" value="Submit" disabled><i className="fa fa-gavel fa-1x"></i> Bid</button>
                        </form>
                  } 
                  

              <p className="helper">Bids More Than {this.state.item.prize}฿ To Win This Auction </p>
            </div>
          </div>
        </div>

        <div className="auct-table-container">
          <Auctionlist id={this.props.match.params.itemId} ReserveBid={this.state.item.ReserveBid}  />
        </div>


        <div className="row">
          <div className="small-12 columns auct-tab_desc-container">
              <p>When you place a bid higher than the minimum bid, the system will
              then automatically bid for you. Please note we will never place a bid
              that is higher than the bid you placed.
              Our system is designed to save you money and give you the best
              possible chance to win the auction at the lowest price.
              This way you can decide the maximum price you are willing to pay
              for an item and still have a good chance of winning the item at a
              lower price than your maximum bid.
              </p>
          </div>
        </div>



      </div>

    </div>
  </div>



    )
  }
}

export default Item

