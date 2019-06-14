import React, { Component } from 'react';
import axios from 'axios';
import SelectRow from './SelectRow';
import TaskRow from './TaskRow';

export default class Work extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskID = this.onChangeTaskID.bind(this);
    this.onChangeWorkData = this.onChangeWorkData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectchange = this.selectchange.bind(this);
    this.fetchtaskwork = this.fetchtaskwork.bind(this);

    this.state = {
      task_id: '',
      work_data: '',
      result: '',
      prev_work_data : [],
      task : [''],
    }
  }

  selectchange(e) {
    e.preventDefault();
    var value = e.target.value;
    console.log('selected value='+value);

    if( value){
      this.fetchtaskwork(value);
    }
    else{
      this.setState({
        prev_work_data : [],
      })
    }
  }

  fetchtaskwork(value){

    console.log('fetchtaskwork called with value '+value);
    this.setState({
      task_id : value
    })

    axios.get('/task/gettaskbytask/'+value)
    .then(response => {
      console.log('after then');
      console.log(response.data.task_id);
        this.setState({ 
          prev_work_data: response.data.work_data });
    })
    .catch(function (error) {
        console.log(error);
    })    
  }

  tabRow(){
    
    return this.state.prev_work_data.map(function(object, i){
        return <TaskRow obj={object} key={i} />;
        
    });
  }

  componentDidMount() {
   axios.get('/task')
    .then(response => {
      var taskarray =[ { "task_id" : ''}];
      //response.data.push(taskarray);
      response.data.unshift(taskarray)
      console.log(JSON.stringify(response.data));
      this.setState({ task: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }



  selectRow() {

    return this.state.task.map(function(object, i){
        return <SelectRow obj={object} key={i} />;
    });
  }
  onChangeTaskID(e) {
    this.setState({
      task_id: e.target.value
    });
  }
  onChangeWorkData(e) {
    this.setState({
      work_data: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      task_id: this.state.task_id,
      work_data: {
        data : this.state.work_data,
        date : Date.now(),
      }
    };
    axios.post('/task/addwork', obj)
        .then(res => {
          console.log("successfully added work");
          console.log("calling fetch using taskid "+ obj.task_id);
          this.fetchtaskwork(obj.task_id)
        }
        );
    
    this.setState({
      task_id: '',
      work_data: '',
    })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            
            <form onSubmit={this.onSubmit}>
              <div className="row">
                
                <div class="form-group" className ="col-sm-8">
                  <label>Task ID:</label>
                  <select class="form-control" id="sel1" onChange={this.selectchange}>
                    { this.selectRow() }

                  </select>
                </div>
                <div className="col-sm-4"> </div>
              </div>
              <div className="row">
                
                <div className="col-sm-10" style={{'overflow' : 'auto','minHeight': '300px', 'maxHeight': '300px'}}>
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
                <div className="col-sm-2"></div>
                <br/>
              </div>
              
              <div className="row">
                  
                <div className="col-sm-6">
                  <input type="text" 
                    className="form-control"
                    value={this.state.work_data}
                    placeholder="Enter your work here"
                    onChange={this.onChangeWorkData}
                    />
                </div>
                <div className="col-sm-3">
                  <input type="submit" value="Register Task" className="btn btn-primary"/>
                </div>
                <div className="col-sm-3"></div>

                
              </div>
            </form>

            <h4> { this.state.result } </h4>
        </div>
    )
  }
}