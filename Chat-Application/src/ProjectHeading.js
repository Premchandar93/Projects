import React, { Component } from 'react';
import ProjectToast from './ProjectToast.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
require('./testcss.css');

class ProjectHeading extends Component {
	render() {
		return(
			<h3>
				Chat Box <br/>
	        	<h6>Username: {this.props.name}</h6>
	        	<ProjectToast />
	        </h3>
		);
	}
}

export default ProjectHeading;