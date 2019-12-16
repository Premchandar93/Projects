import React, { Component } from "react";
import {Form} from 'react-bootstrap'
import FormGroup from './FormGroup.js'
import data from './data.js'
import { GetInterviewAPI, PostFeedbackAPI, ShowSuccessAlert, ShowDangerAlert, HideAlert } from "../actions/actionCreator";
import { connect } from 'react-redux'
import AlertMessage from './AlertMessage'

class AddFeedback extends Component {

  handleSubmit(e){
    e.preventDefault();

    window.scrollTo(0, 0);
  
    let form = e.target;
    var formelements = form.elements;
    
    var body = {};
    var formFields = data.AddFeedback.Fields;

    for( var i = 0; i < formFields.length; i++ ){
      if ( formFields[i].formtype !== 'Button') {
        body[formFields[i].formgroupid] = formelements[i].value;
      }
    }


    this.props.postFeedback({
      alert: data.AlertBox,
      payload: body,
      url : data.AddFeedback.URL + body.feedback_company_id,
    });

    form.reset();
  }

  componentDidMount(){
    this.props.fetchInterviews({
      alert: data.AlertBox,
      url : data.ViewExperience.URL,
    });
  }

  render(){
    data.AddFeedback.Fields[0].values = this.props.interviewList.map((interview, index) => {
      return {
        name : interview.interview_company_name,
        formvalue : interview._id
      };
    })

    if ( !this.props.isLoading ) {
      return (
        <div  className="margindiv">
        <Form onSubmit={e => this.handleSubmit(e)}>
            {data.AddFeedback.Fields.map((field,index) => (
              <FormGroup 
                role="form"
                key={index}
                values= {field.values}
                formgroupid={field.formgroupid} 
                id={field.id} 
                formtype={field.formtype} 
                name={field.name} 
                type={field.type} 
                placeholder={field.placeholder}/>
            ))}

        </Form>
        </div>
      );
    }
    else {
      return(
        <AlertMessage message={this.props.alertMessage} />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({ 
    isLoading : state.alertBox.status,
    alertHeading : state.alertBox.heading,
    alertMessage : state.alertBox.message,
    alertVariant : state.alertBox.variant,
    
    interviewList : state.interviewData.interviewList,
 });
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInterviews : (param) => dispatch(GetInterviewAPI(param)),
    postFeedback : (param) => dispatch(PostFeedbackAPI(param)),
    showSuccessAlert : (param) => dispatch(ShowSuccessAlert(param)),
    showDangerAlert : (param) => dispatch(ShowDangerAlert(param)),
    hideAlert : (param) => dispatch(HideAlert(param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedback);