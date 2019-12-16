import React, { Component } from "react";
import {Navbar} from 'react-bootstrap'
import data from './data'
import NavHeading from './NavHeading.js';
import NavUser from './NavUser'
import './../index.css';

class NavBar extends Component {
	render() {
		return (
			<Navbar sticky="top" bg="dark" variant="dark" >
        <Navbar.Brand href="/">{data.Title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavHeading/>
        </Navbar.Collapse>
        <NavUser/>
      </Navbar>
		);
	}
}

export default NavBar;