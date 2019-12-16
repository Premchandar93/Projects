import React, { Component } from "react";
import {Form, Row, Col} from 'react-bootstrap'
import FormLabel from './FormLabel'
import FormButton from './Button'
import data from './data'

class FormGroup extends Component {

	switchFormType(param){
		switch( param ) {
			case 'Control' :
				return (<Form.Control type={this.props.type} placeholder={this.props.placeholder} />);
			case 'ControlAs' : 
				return (<Form.Control as={this.props.type} rows={this.props.rows} placeholder={this.props.placeholder} />);
			case 'Check' :
				return (<Form.Check type={this.props.type} id={this.props.id} label={this.props.placeholder}/>);
			case 'Button' :
				return (<FormButton id={this.props.id} name={this.props.name} type={this.props.type} variant={this.props.variant} />);
			case 'Select' :
				return (
					<Form.Control as={this.props.type}>
					{
						this.props.values.map((value, index) => 
								<option key={index} value={value.formvalue}>{value.name}</option>
						)
					}	
				    </Form.Control>
				);
			default :
				return (<Form.Control type={this.props.type} placeholder={this.props.placeholder} />);
		}
	}

	render() {
		return (
			<div >
				<Col md={{ span: data.FormGroup.span, offset: data.FormGroup.offset }}>
			        {
			        	this.props.formtype !== 'Button' ? 
			        	(	
			        		<div>
			        		<Form.Group as={Row} controlId={this.props.formgroupid}>
							<FormLabel name={this.props.name}/>
								{ this.switchFormType(this.props.formtype, this.props.values) }
							</Form.Group>
							</div>
			        	)
			        	:
			        	(
			        		<div className="text-center">
			        		<Form.Group controlId={this.props.formgroupid}>
			        		{ this.switchFormType(this.props.formtype) }
			        		</Form.Group>
			        		</div>
			        	)
			        }
		        </Col>
	        </div>
		);
	}
}

export default FormGroup;