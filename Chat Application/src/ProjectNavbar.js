import React, { Component } from 'react';
import ProjectNavDropdown from './ProjectNavDropdown.js';
import { Badge, Navbar, Nav } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
require('./testcss.css');

class ProjectNavbar extends Component {
  render(){
    return (
      <div>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixedTop>
          <Navbar.Brand href="#home">Active Users <Badge variant="light"> {this.props.users } </Badge> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <ProjectNavDropdown 
                users={this.props.users}
                notifications={this.props.notifications}
                name={this.props.name}
                updateclicked={this.props.updateclicked}
                user_list={this.props.user_list}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}


export default ProjectNavbar;
