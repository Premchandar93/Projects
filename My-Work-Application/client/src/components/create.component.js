import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskID = this.onChangeTaskID.bind(this);
    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      task_id: '',
      task_name: '',
      result: '',
    }
  }
  onChangeTaskID(e) {
    this.setState({
      task_id: e.target.value
    });
  }
  onChangeTaskName(e) {
    this.setState({
      task_name: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      task_id: this.state.task_id,
      task_name: this.state.task_name,
    };
    axios.post('/task/addtask', obj)
        .then(res => this.setState({
        	result: 'Task added successfully'
        }));
    
    this.setState({
      task_id: '',
      task_name: '',
    })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Task</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Task ID:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.task_id}
                      onChange={this.onChangeTaskID}
                      />
                </div>
                <div className="form-group">
                    <label>Task Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.task_name}
                      onChange={this.onChangeTaskName}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" value="Register Task" className="btn btn-primary"/>
                </div>
            </form>
            <h4> { this.state.result } </h4>
        </div>
    )
  }
}