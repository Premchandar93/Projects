import React, { Component } from "react";
import {Form} from 'react-bootstrap'

class FormLabel extends Component {
	render() {
		return (
	      <Form.Label >
	        {this.props.name}
	      </Form.Label>
		)
	}
}

export default FormLabel;