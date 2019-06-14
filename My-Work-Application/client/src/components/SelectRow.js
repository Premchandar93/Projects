import React, { Component } from 'react';

class SelectRow extends Component {

  
  render() {


    return (
        <option value={this.props.obj.task_id}>{this.props.obj.task_name}</option>
    );
  }
}

export default SelectRow;