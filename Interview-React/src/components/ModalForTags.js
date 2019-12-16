import React, { Component } from "react";
import {Tab, Row, Col, Nav} from 'react-bootstrap'
import CardForTags from './CardForTags'

class ModalForTags extends Component {

  renderModal(){
    var result = [] ;

    var navItemChildren = [];
    var tabPaneChildren = [];

    var index = 1;
    for (var key in this.props.tags) {
      var value = this.props.tags[key];

      navItemChildren.push(
        <Nav.Item key={index}>
          <Nav.Link eventKey={index}>{key}</Nav.Link>
        </Nav.Item>
      );

      tabPaneChildren.push(
         <Tab.Pane eventKey={index} key={index}>
          <CardForTags tags={value}/>
        </Tab.Pane>           
      );

      index++;
    }

    result.push(
      <Tab.Container defaultActiveKey="1" key="1">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {navItemChildren}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {tabPaneChildren}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      );
      return result;
  }

  render(){
    return (
        <div>
        {this.renderModal()}
        </div>
    );
  }
}

export default ModalForTags;


