import React, { Component } from "react";
import {Card, ListGroup} from 'react-bootstrap'

class CardForTags extends Component {
  render(){
    return (
      <div>
      {
        this.props.tags.map((item,index) => (
          <Card key={index }>
            <Card.Header>{item.feedback_company_round}</Card.Header>
            <Card.Body>
              <Card.Title>{item.feedback_question}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.feedback_description}</Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item key="1">{item.feedback_answer}</ListGroup.Item>
                <ListGroup.Item key="2">{item.feedback_feedback}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{item.feedback_tag} </small>
            </Card.Footer>
          </Card>
        ))
      }
      </div>
    );
  }
}

export default CardForTags;