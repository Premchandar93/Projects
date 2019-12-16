import React, { Component } from "react";
import '../index.css'

class Paragraph extends Component {
	render() {
		return (
			<div className="headingdiv ">
				<p>
				{this.props.content}
				</p>
			</div>
		)
	}
}

export default Paragraph;