import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskID = this.onChangeTaskID.bind(this);
    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      task_id: '',
      task_name: '',
    }
  }

  componentDidMount() {
      axios.get('/task/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                task_id: response.data.task_id, 
                task_name: response.data.task_name });
          })
          .catch(function (error) {
              console.log(error);
          })
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
    axios.post('/task/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Task</h3>
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
                    <input type="submit" 
                      value="Update Task" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}