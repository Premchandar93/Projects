import React, { Component } from "react";
import {Form} from 'react-bootstrap'
import FormGroup from './FormGroup.js'
import data from './data.js'
import AlertMessage from './AlertMessage'
import { PostInterviewAPI, ShowSuccessAlert, ShowDangerAlert, HideAlert } from "../actions/actionCreator";
import { connect } from 'react-redux'

class AddInterview extends Component {

  handleSubmit(e){
    e.preventDefault();
    window.scrollTo(0, 0);
    let form = e.target;
    var formelements = form.elements;
    
    var body = {};
    var formFields = data.AddInterview.Fields;

    for( var i = 0; i < formFields.length; i++ ){
      if ( formFields[i].formtype === 'Check'){
        body[formFields[i].formgroupid] = (formelements[i].checked) ? 'yes' : 'no';
      }
      else if ( formFields[i].formtype !== 'Button') {
        body[formFields[i].formgroupid] = formelements[i].value;
      }
    }

    this.props.postinterview({
      alert: data.AlertBox,
      payload: body,
      url : data.AddInterview.URL,
    });

    form.reset();
  }

  render(){
    if ( this.props.isLoading ){
      return (
        <AlertMessage message={this.props.alertMessage} />
      );
    }
    else {
      return (
        <div  className="margindiv">
        <Form onSubmit={e => this.handleSubmit(e)}>
            {data.AddInterview.Fields.map((field,index) => (
              <FormGroup 
                role="form"
                key={index}
                formgroupid={field.formgroupid} 
                id={field.id} 
                formtype={field.formtype} 
                name={field.name} 
                type={field.type} 
                placeholder={field.placeholder}
                variant={this.props.variant}
                />
            ))}
        </Form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({ 
    cookies : ownProps.cookies,

    isLoading : state.alertBox.status,
    alertHeading : state.alertBox.heading,
    alertMessage : state.alertBox.message,
    alertVariant : state.alertBox.variant
 });
};

const mapDispatchToProps = (dispatch) => {
  return {
    postinterview : (param) => dispatch(PostInterviewAPI(param)),
    showSuccessAlert : (param) => dispatch(ShowSuccessAlert(param)),
    showDangerAlert : (param) => dispatch(ShowDangerAlert(param)),
    hideAlert : (param) => dispatch(HideAlert(param)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(AddInterview);