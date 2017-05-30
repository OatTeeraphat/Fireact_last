import React, { Component } from 'react'
import Edit from './Edit.js'
import Cart from './Cart.js'

export default class Configitem extends Component {
  render () {
    return (
    <div className="row">
		<div className="small-11 meduim-8 large-12 small-centered">
	        <Edit />
	        <Cart />
	    </div>
    </div>
    )
  }
 }

