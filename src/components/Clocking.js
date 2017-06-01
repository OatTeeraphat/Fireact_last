import React from 'react'
import * as firebase from 'firebase'
import moment from 'moment'

class RealClock extends React.Component {
    state = {
        Diff:this.props.Diff
    }

    timer = () => {
    this.setState({Diff:this.state.Diff -1})
    if(this.state.Diff < 1) { 
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
              }
              )
          })
    }}

    componentDidMount() {
    this.setState({CountDown:this.props.Diff -1})
    this.intervalId = setInterval(this.timer, 1500);
  }

    render() {
    let hr =  Math.floor(moment.duration(this.state.Diff,'seconds').asHours())
    let min = moment.duration(this.state.Diff,'seconds').minutes()
          min = ("0" + min).slice(-2)
    let sec = moment.duration(this.state.Diff,'seconds').seconds()
          sec = ("0" + sec).slice(-2)
    let format = hr + ':' + min + ':' + sec ;
        return (
            <span className="timecount red">
                {format}
            </span>
        )
    }
}

export default RealClock