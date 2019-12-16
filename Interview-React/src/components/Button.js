
import React, { Component } from "react";
import {Button} from 'react-bootstrap'

class FormButton extends Component {
	render() {
		return (
		  <Button variant={this.props.variant} type={this.props.type}>
		    {this.props.name}
		  </Button>
		)
	}
}

export default FormButton;
