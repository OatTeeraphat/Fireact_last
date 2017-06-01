import React, { Component } from 'react'
import * as firebase from 'firebase'
import moment from 'moment'


class Clock extends Component {
  state ={
      intervalId: '',
      timetoauct: '',
      auctround: '',
  }

  timer = () => {
   firebase.database().ref().child('items').child(this.props.dbkey).update({
    timetoauct: this.props.timetoauct - 1,
     })

   if(this.state.timetoauct < 1) { 
       this.intervalId && clearInterval(this.intervalId)
       this.intervalId = false
      firebase.database().ref().child('items').child(this.props.dbkey).child('History')
        .on('value', dataSnapshot => {
        let test = dataSnapshot.numChildren()
            dataSnapshot.forEach( childSnapshot => {
                let item = childSnapshot.val();
                item['.key'] = childSnapshot.key
                if(item.auctround === test) {
                let Winner = item.user
                firebase.database().ref().child('items').child(this.props.dbkey).update({
                        status: 0,
                        Winner: Winner
                })}
              });
          })
      let keyRef =firebase.database().ref().child('items').child(this.props.dbkey).child('categories')
      keyRef.on("value", snapshot => {
        let key = snapshot.val();
        let categoryRef = firebase.database().ref().child('category');
        categoryRef.child(key).child('avaliableitem').transaction(count => {
            if (count === null) {
                return count = 0
            } else {
                return count - 1
            }
        })
        categoryRef.child(key).child('remainitem').transaction(count => {
            if (count === null) {
                return count = 1
            } else {
                return count + 1
            }
        })
      })
    }
  }
  
  componentDidMount() {
    let timeRef =firebase.database().ref().child('items').child(this.props.dbkey).child('timetoauct')
    let roundRef =firebase.database().ref().child('items').child(this.props.dbkey).child('auctround')
        timeRef.on("value", snapshot => {
        let gettime = snapshot.val();
        this.setState({timetoauct:gettime })
    })
        roundRef.on("value", snapshot => {
        let getround = snapshot.val();
        this.setState({auctround:getround })
    })
    this.intervalId = setInterval(this.timer, 1500);
  }

  componentWillUnmount () {
    this.intervalId && clearInterval(this.intervalId)
    this.intervalId = false
  }



  render() {

      let gettime2 = this.state.timetoauct
      let hr =  Math.floor(moment.duration(gettime2,'seconds').asHours())
      let min = moment.duration(gettime2,'seconds').minutes()
          min = ("0" + min).slice(-2)
      let sec = moment.duration(gettime2,'seconds').seconds()
          sec = ("0" + sec).slice(-2)
      let check = hr+min+sec
      let format = hr + ':' + min + ':' + sec ;
      var res_time = "";
      if( check < 30 ){
          res_time = 'timecount red'
      }else if( check < 1000 ){
          res_time = 'timecount yellow'
      }else{
           res_time = 'timecount green'
      }

    return this.state.timetoauct > 0 ?
       <div><span className={res_time}>{format}</span></div>
       : <div><span className={res_time}>00:00:00</span></div>
  }
}

module.exports = Clock;