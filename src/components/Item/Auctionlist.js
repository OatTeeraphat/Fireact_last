import React from 'react'
import * as firebase from 'firebase'



class Auct extends React.PureComponent {
  render(){
    return (
      <tr>
        <td>{this.props.user}</td>
        <td>{this.props.ReservePrize}<span>THB</span></td>
        <td className="time">{this.props.time}</td>
      </tr>
    )
  }
}


class Auctionlist extends React.Component {
    constructor () {
    super();
    this.state = {
      historys: [],
    }}

    componentDidMount() {
    firebase.database().ref().child('items').child(this.props.id).child('History')
    .on('value', dataSnapshot => {
      let historys = []
      dataSnapshot.forEach( (childSnapshot) => {
        let geth = childSnapshot.val()
        geth['.key'] = childSnapshot.key
        historys.push(geth)
      })

      this.setState({
        historys: historys
      })
    })
  }

  render() {
    return (
        <table className="hover auct-table">
            <tbody>
                {this.state.historys.map((history) => {
                return ( 
                    <Auct key={ history['.key'] } {...history} />
                )})}
            </tbody>
        </table>
    )
  }
}
export default Auctionlist