import React, { Component } from 'react';
import axios from 'axios';
import TaskRow from './TaskRow';

export default class View extends Component {
  constructor(props) {
    super(props);


    this.state = {
      task_id: '',
      task_name: '',
      work_data: [],
    }
  }

  componentDidMount() {
      axios.get('/task/gettask/'+this.props.match.params.id)
          .then(response => {
            console.log('after then');
            console.log(response.data.task_id);
              this.setState({ 
                task_id: response.data.task_id, 
                task_name: response.data.task_name,
                work_data: response.data.work_data });
          })
          .catch(function (error) {
              console.log(error);
          })
  }
  tabRow(){
    return this.state.work_data.map(function(object, i){
        return <TaskRow obj={object} key={i} />;
    });
  }

  render() {
    return (
        <div>
          <h3 align="center">View Task History</h3>
          <h4 align="center"> { this.state.task_id } - { this.state.task_name } </h4>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Work</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
    )
  }
}