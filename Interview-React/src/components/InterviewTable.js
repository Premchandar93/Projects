import React, { Component } from "react";
import {Table} from 'react-bootstrap'

class InterviewTable extends Component {
  render(){
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Count</th>
            <th>Role</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.tags.map((item,index) => (
            <tr key={index}>
              <td>{item.interview_company_name}</td>
              <td>{item.interview_company_location}</td>
              <td>{item.interview_role}</td>
              <td>{item.interview_date}</td>
              <td>{item.interview_status}</td>
            </tr>
          ))
        }

        </tbody>
      </Table>
    );
  }
}

export default InterviewTable;
