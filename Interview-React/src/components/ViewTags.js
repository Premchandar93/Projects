import React, { Component } from "react";
import data from './data.js'
import { GetInterviewAPI, ShowSuccessAlert, ShowDangerAlert, HideAlert } from "../actions/actionCreator";
import { connect } from 'react-redux'
import AlertMessage from './AlertMessage';
import ModalForTags from './ModalForTags'

class ViewTags extends Component {

  componentDidMount(){
    this.props.fetchinterviews({
      alert: data.AlertBox,
      url : data.ViewExperience.URL,
    });
  }

  render(){
    if( this.props.interviewList.length !== 0 ) {

      console.log(JSON.stringify(this.props.interviewList))
      var tagsList = {};
      for ( var i=0 ; i < this.props.interviewList.length ; i++) {
        var feedbackList = this.props.interviewList[i].interview_feedback;
        for( var j = 0; j < feedbackList.length; j++){
          var tags = feedbackList[j].feedback_tag.split(',');
          
          for( var k =0; k < tags.length ; k++){

            if ( tagsList[tags[k]] ){
              tagsList[tags[k]].push( feedbackList[j] );
            }
            else {
              tagsList[tags[k]] = [ feedbackList[j] ];
            }
          }
        }
      }


      return (
        <div className="margindiv">
          <ModalForTags tags={tagsList}/>
        </div>
      );
    }
    else{
      return (
        <AlertMessage message={this.props.alertMessage}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(ViewTags);