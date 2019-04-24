import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
require('./testcss.css');

class ProjectToast extends Component {
	render(){
		return(
			<ToastContainer hideProgressBar newestOnTop autoClose={3000} closeOnClick/>
		);
	}
}

export default ProjectToast;