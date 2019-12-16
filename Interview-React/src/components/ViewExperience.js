import React, { Component } from "react";
import data from './data.js'
import { GetInterviewAPI, ShowSuccessAlert, ShowDangerAlert, HideAlert } from "../actions/actionCreator";
import { connect } from 'react-redux'
import AlertMessage from './AlertMessage';
import ModalForInterview from './ModalForInterview'

class ViewExperience extends Component {

  componentDidMount(){
    this.props.fetchinterviews({
      alert: data.AlertBox,
      url : data.ViewExperience.URL,
    });
  }

  render(){
    if( !this.props.isLoading ) {
      return (
        <div className="margindiv">
          <ModalForInterview interviews={this.props.interviewList}/>
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
    interviewList : state.interviewData.interviewList
 });
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchinterviews : (param) => dispatch(GetInterviewAPI(param)),
    showSuccessAlert : (param) => dispatch(ShowSuccessAlert(param)),
    showDangerAlert : (param) => dispatch(ShowDangerAlert(param)),
    hideAlert : (param) => dispatch(HideAlert(param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewExperience);