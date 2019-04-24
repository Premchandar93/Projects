import React, { Component } from 'react';
import { Badge, NavDropdown } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
require('./testcss.css');

class ProjectNavDropdown extends Component {
  render() {
    if ( this.props.users > 0 ){
      return (
        <div>
          <NavDropdown title="View Users" id="collasible-nav-dropdown">
            {
              this.props.user_list.map( ( name, i ) => {
                var notify = this.props.notifications[name];
                if (!notify) { notify = 0;}
                if ( name !== this.props.name ) {
                  if ( notify > 0 ) {
                    return <div><NavDropdown.Item href={"#"+i+'link'} key={i}  onClick={(e) => { e.preventDefault(); this.props.updateclicked({name});}}>{name} <Badge variant="dark"> {notify} </Badge></NavDropdown.Item></div>
                  }
                  else{
                    return <div><NavDropdown.Item key={i} href={'#' + i + 'link'} onClick={(e) => { e.preventDefault(); this.props.updateclicked({name});}}>{name}</NavDropdown.Item></div>
                  }
                }
                return '';
              })
            }
          </NavDropdown>
        </div>
      );
    }
    return '';
  }
}

export default ProjectNavDropdown;


