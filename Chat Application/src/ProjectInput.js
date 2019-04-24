import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
require('./testcss.css');

class ProjectInput extends Component {
	render(){
		return (
	      <div className="chat-input">
	        <input type="text"
	          name="textmsg"
	          id="textmsg"
	          disabled
	          placeholder="Enter your message and press enter..."
	          required />
	        <Button style={{display:'none'}} className="primary" name='click' id="click" onClick={this.props.handleclick}>Click Me</Button>
	      </div>
		);
	}
}


export default ProjectInput;