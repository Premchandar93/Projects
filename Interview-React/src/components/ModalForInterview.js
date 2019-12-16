import React, { Component } from "react";
import {Card, CardColumns, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data'
import { connect } from 'react-redux'
import { DeleteInterviewAPI, ShowSuccessAlert, ShowDangerAlert, HideAlert } from "../actions/actionCreator";


class ModalForInterview extends Component {
  handleDelete(id, index) {


    this.props.deleteinterview({
      alert: data.AlertBox,
      url : data.DeleteInterview.URL + id,
    });

    this.props.interviews.splice(index, 1);
  }


  render(){
    return (
      <CardColumns>
      {
        this.props.interviews.map((item,index) => (
          <Card key={index} border={item.interview_status === 'yes' ? "success" : "danger"}>
            <Card.Header>{item.interview_company_name}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>Role : {item.interview_role}</ListGroup.Item>
                <ListGroup.Item>Location : {item.interview_company_location}</ListGroup.Item>
                <ListGroup.Item>Status : {item.interview_status === 'yes' ? 'Selected' : 'Rejected'}</ListGroup.Item>
                <ListGroup.Item>Date : {item.interview_date}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <Card.Link href={"/viewfeedback/"+item._id}>View</Card.Link>
              <Card.Link href="#" onClick={item_id => this.handleDelete(item._id, index)}>Delete</Card.Link>
            </Card.Footer>
          </Card>
        ))
      }
      </CardColumns>
    );
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
    deleteinterview : (param) => dispatch(DeleteInterviewAPI(param)),
    showSuccessAlert : (param) => dispatch(ShowSuccessAlert(param)),
    showDangerAlert : (param) => dispatch(ShowDangerAlert(param)),
    hideAlert : (param) => dispatch(HideAlert(param)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(ModalForInterview);