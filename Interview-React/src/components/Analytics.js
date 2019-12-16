import React, { Component } from "react";
import data from './data.js'
import { GetInterviewAPI, ShowSuccessAlert, ShowDangerAlert, HideAlert } from "../actions/actionCreator";
import { connect } from 'react-redux'
import AlertMessage from './AlertMessage';
import Title from './Title';
import AnalyticsCalendar from './AnalyticsCalendar'
import {Row, Col} from 'react-bootstrap'
import AnalyticsPie from './AnalyticsPie';
import AnalyticsBar from './AnalyticsBar';
import Paragraph from './Paragraph'
import Jumbo from './Jumbo'

class Analytics extends Component {

  componentDidMount(){
    this.props.fetchinterviews({
      alert: data.AlertBox,
      url : data.ViewExperience.URL,
    });
  }

  form_chart_data(){
      var calendar_data_hash = {};
      var pie_data_hash = {};
      var company_data = [];
      var company_data_hash = {};
      var ds_data_hash = {};
      var pie_data = [];
      var recentDate;

      for( var i =0; i < this.props.interviewList.length; i++){
          if ( calendar_data_hash[this.props.interviewList[i].interview_date] ){
            calendar_data_hash[this.props.interviewList[i].interview_date]++;
          }
          else{
            calendar_data_hash[this.props.interviewList[i].interview_date] = 1;
          }

          if ( recentDate ) {
            if ( this.props.interviewList[i].interview_date > recentDate) {
              recentDate = this.props.interviewList[i].interview_date;
            }
          }
          else{
            recentDate = this.props.interviewList[i].interview_date;
          }

           var interview_feedback = this.props.interviewList[i].interview_feedback;
           var temp_pie_data = {};
           for ( var j =0 ; j < interview_feedback.length ; j++){
             temp_pie_data[interview_feedback[j].feedback_company_round] = 1;

             var round = interview_feedback[j].feedback_company_round;
             
             if ( company_data_hash[round] ){
               company_data_hash[round] += 1;
             }
             else {
               company_data_hash[round] = 1;
             }

             var tag = interview_feedback[j].feedback_tag;
             
             var tag_array = tag.split(',');
             
             for( var k =0 ; k < tag_array.length; k++) {
               if ( ds_data_hash[tag_array[k]] ){
                 ds_data_hash[tag_array[k]] += 1;
               }
               else{
                 ds_data_hash[tag_array[k]] = 1;
               }
             }
           }
          
           for ( var key in temp_pie_data ) {
              if ( pie_data_hash[key] ){
                pie_data_hash[key] += 1;
              }
               else {
                 pie_data_hash[key] = 1;
               }
           }

          var count2 = 0;
          for ( var hash_key in pie_data_hash ){
            pie_data.push({
              id : hash_key,
              label : hash_key,
              value : pie_data_hash[hash_key],
              color : data.Analytics.PieColors[count2].color
            });
            count2++;
          }
      }

      for ( var key2 in company_data_hash ){
        company_data.push({
          round_name : key2,
          attended : company_data_hash[key2]
        });
      }

      var calendar_data = [];
      for (var key3 in calendar_data_hash) {
        calendar_data.push({
          day : key3,
          value : calendar_data_hash[key3]
        });
      }

      var ds_data = [];

      var count = 0;
      for ( var key4 in ds_data_hash ){
        ds_data.push({
          id : key4,
          label : key4,
          value : ds_data_hash[key4],
          color : data.Analytics.PieColors[count].color
        });
        
        count++;
      }

      var date2 = new Date();
      var date1 = new Date(recentDate);
        
      // To calculate the time difference of two dates 
      var Difference_In_Time = date2.getTime() - date1.getTime(); 
        
      // To calculate the no. of days between two dates 
      var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));

      return { 
        calendar_data : calendar_data, 
        pie_data : pie_data, 
        diff_days : Difference_In_Days,
        company_data : company_data,
        pie_data_for_ds : ds_data
      };
  }

  render(){
    if( !this.props.isLoading) {

      var total_interview = this.props.interviewList.length;

      var result = this.form_chart_data();

      var calendar_data = result.calendar_data;
      var recentDate = result.diff_days;

      var pie_data = result.pie_data;
      var pie_data_for_ds = result.pie_data_for_ds;
      var bar_data = result.company_data;

      return (
        <div>
          <Row>
            <Col sm={2}>    
            </Col>         
            <Col className="text-center" sm={4}>  
              <Jumbo name={total_interview} content={data.Analytics.TotalInterviews}/>
            </Col>
            <Col className="text-center"  sm={4}> 
              <Jumbo name={recentDate} content={data.Analytics.LastInterview}/>
            </Col>
            <Col sm={2}>  
            </Col>
          </Row>
          <Row>
            <Col sm={2}>  
              
            </Col>
            <Col sm={8}>

              <Title name={data.Analytics.Calendar}/>
              <Paragraph content={data.Analytics.CalendarParagraph}/>
              <AnalyticsCalendar data={calendar_data}/>
            </Col>

          </Row>
          <Row>
            <Col sm={2}>  
              
            </Col>
            <Col sm={8}>
              <Title name={data.Analytics.Pie}/>
              <Paragraph content={data.Analytics.PieParagraph}/>
              <AnalyticsPie data={pie_data}/>
            </Col>

          </Row>
          <Row>
            <Col sm={2}>  
              
            </Col>
            <Col sm={8}> 
            <Title name={data.Analytics.Bar}/>
              <Paragraph content={data.Analytics.BarParagraph}/>
              <AnalyticsBar 
                data={bar_data} 
                index_name="round_name" 
                xaxis="Round" 
                yaxis="Count"
                keys="attended"/>
            </Col>

          </Row>
          <Row>
            <Col sm={2}>  
              
            </Col>
            <Col sm={8}>
              <Title name={data.Analytics.PieForDS}/>
              <Paragraph content={data.Analytics.PieForDSParagraph}/>
              <AnalyticsPie data={pie_data_for_ds}/>
            </Col>

          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);