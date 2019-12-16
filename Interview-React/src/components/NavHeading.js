import React, { Component } from "react";
import data from './data';
import {Nav} from 'react-bootstrap'

class NavHeading extends Component {
  render() {
    return (
      <Nav className="mr-auto">
        {data.Headings.length !== 0 ? (
          data.Headings.map((heading,index) => (
            <Nav.Link key={index} href={heading.link}>{heading.name}</Nav.Link>
          ))
        ) : (
          <Nav.Link href="#home">Heading</Nav.Link>
        )}{" "}
      </Nav>
    );
  }
}

export default NavHeading;