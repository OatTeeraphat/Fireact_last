import React, { Component } from 'react'
import * as firebase from 'firebase'
import moment from 'moment'

class ViewClock extends Component {
  state ={
      timetoauct: ''
  }

  componentDidMount() {
    let timeRef =firebase.database().ref().child('items').child(this.props.dbkey).child('timetoauct')
        timeRef.on("value", snapshot => {
        let gettime = snapshot.val()
        let format =  Math.floor(moment.duration(gettime,'seconds').asHours()) + ':' + moment.duration(gettime,'seconds').minutes() + ':' + moment.duration(gettime,'seconds').seconds();
        this.setState({timetoauct:format })
    })
  }

  render() {
    let gettime2 = this.state.timetoauct
      let hr =  Math.floor(moment.duration(gettime2,'seconds').asHours())
      let min = moment.duration(gettime2,'seconds').minutes()
          min = ("0" + min).slice(-2)
      let sec = moment.duration(gettime2,'seconds').seconds()
          sec = ("0" + sec).slice(-2)
      let format = hr + ':' + min + ':' + sec 
    return(
      <span className="timecount green">{format}</span>
    );
  }
}

export default ViewClock