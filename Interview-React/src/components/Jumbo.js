
import React, { Component } from "react";
import {Jumbotron} from 'react-bootstrap'

class Jumbo extends Component {
	render() {
		return (
	        <Jumbotron className="titlediv">
	          <h1>{this.props.name}</h1>
	          <p>{this.props.content}</p>
	        </Jumbotron>
		)
	}
}

export default Jumbo;
