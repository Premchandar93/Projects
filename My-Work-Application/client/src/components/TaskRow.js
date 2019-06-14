import React, { Component } from 'react';

class TaskRow extends Component {

  
  render() {
    var d = new Date(this.props.obj.date);
    var dateinformat = d.toDateString();
    var timeinformat = d.toLocaleTimeString();
    var datetime = dateinformat + ' - ' + timeinformat;

    return (
        <tr>
          <td>
          {datetime}
          </td>
          <td>
            {this.props.obj.data}
          </td>
        </tr>
    );
  }
}

export default TaskRow;