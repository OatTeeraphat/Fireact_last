import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'


class Category extends Component {
  render(){
    return (
        
          <div className="small-12 medium-6 columns chart-box cat-box">
            <div className="small-3 medium-5 large-3 columns text-center">
              <i className={"fa " + this.props.icon + " fa-3x"}></i>
              <h4>{this.props.text}</h4>
            </div>
            <div className="small-9 medium-7 large-9 columns text-center cat-desc">
              <div className="row">
                <div className="small-4 columns"><p className="num">{this.props.allitem}</p>All Item</div>
                <div className="small-4 columns"><p className="num">{this.props.avaliableitem}</p>Avalbale</div>
                <div className="small-4 columns"><p className="num">{this.props.remainitem}</p>Remaining</div>
              </div>
              <span className="panael">
                <Link to="#" onClick={()=> this.props.hell(this.props.dbkey)} ><i className="fa fa-trash"><br/><p>Tash</p></i></Link>
                <Link to="#" ><i className="fa fa-eye"><br/><p>View</p></i></Link>
              </span>
            </div>
          </div>
        
    );
  }
}

class Categories extends Component {
  constructor () {
    super();
    this.state = {
      categories: [],
    };
    this.dbItems = firebase.database().ref().child('category');
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.dbItems.on('value', dataSnapshot => {
      let categories = [];
      dataSnapshot.forEach( childSnapshot => {
        let category = childSnapshot.val();
        category['.key'] = childSnapshot.key;
        categories.push(category);
      });

      this.setState({
        categories: categories
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
          <div className="small-12 columns">
            {this.state.categories.map((category) => {
              return ( 
            <div key={ category['.key'] }>
              <Category dbkey={category['.key']} hell={this.removeItem} {...category} />
            </div>
              );
            })}
          </div>
    );
  }
}

 
export default Categories