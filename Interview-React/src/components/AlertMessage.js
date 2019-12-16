import React, { Component } from "react";
import {Spinner} from 'react-bootstrap'

class AlertMessage extends Component {

	render() {
		return (
	        <div>
		        <div className="spinnercenter text-center">
		      	<Spinner animation="grow" />
		        <p>{this.props.message}</p>
		        </div>
	        </div>
		);
	}
}

export default AlertMessage;

/*
		<div>
			<div
			    style={{
			      position: data.AlertBox.position,
			      top: this.props.heading === data.AlertBox.emptydata.heading ? data.AlertBox.danger_top_margin : data.AlertBox.success_top_margin,
			      right: this.props.heading === data.AlertBox.emptydata.heading ? data.AlertBox.danger_right_margin : data.AlertBox.success_right_margin,
			      'backgroundColor': this.props.variant === 'success' ? data.AlertBox.success_color :  ( this.props.variant === 'danger' ? data.AlertBox.danger_color : data.AlertBox.warning_color ) 
			    }}
			  >
			    <Toast >
			      <ToastHeader closeButton={false}>
			        <strong className="mr-auto">{this.props.heading}</strong>
			      </ToastHeader>
			      <Toast.Body>{this.props.message}</Toast.Body>
			    </Toast>
			</div>
		</div>	
		);
	}
}

export default AlertMessage;
*/