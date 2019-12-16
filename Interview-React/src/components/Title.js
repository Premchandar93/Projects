import React, { Component } from "react";
import '../index.css'

class Title extends Component {
	render() {
		return (
			<div className="titlediv">
				<div><h5>{this.props.name}</h5></div>
			</div>
		)
	}
}

export default Title;