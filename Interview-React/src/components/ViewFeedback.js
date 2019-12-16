import React, { Component } from "react";
import data from './data.js'
import { GetFeedbackAPI, ShowSuccessAlert, ShowDangerAlert, HideAlert } from "../actions/actionCreator";
import { connect } from 'react-redux'
import AlertMessage from './AlertMessage';
import ModalForFeedback from './ModalForFeedback'

class ViewFeedback extends Component {

  componentDidMount(){

    this.props.fetchfeedbacks({
      alert: data.AlertBox,
      url : data.ViewFeedback.URL + this.props.match.params.id,
    });

  }

  render(){

    if( !this.props.isLoading ) {
      return (
        <div className="margindiv">
        <ModalForFeedback feedbacks={this.props.feedbackList}/>
        </div>
      );
    }
    else{
      return (
        <AlertMessage message={this.props.alertMessage} />
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({ 
    isLoading : state.alertBox.status,
    alertHeading : state.alertBox.heading,
    alertMessage : state.alertBox.message,
    alertVariant : state.alertBox.variant,
    feedbackList : state.feedbackData.feedbackList,
    company_name : state.feedbackData.company_name
 });
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchfeedbacks : (param) => dispatch(GetFeedbackAPI(param)),
    showSuccessAlert : (param) => dispatch(ShowSuccessAlert(param)),
    showDangerAlert : (param) => dispatch(ShowDangerAlert(param)),
    hideAlert : (param) => dispatch(HideAlert(param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFeedback);