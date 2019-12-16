import React, { Component } from 'react'
 
import {Jumbotron, Container, Image, Row, Col } from 'react-bootstrap'
import Title from './Title'
import Paragraph from './Paragraph'
import data from './data'
import InterviewQuotes from './InterviewQuotes'

class Home extends Component {
  render() {
  
    return (
      <div>
      <Jumbotron fluid>
      <Container>
        <Row>
        <Col xs={8}>
          <h3>{data.Home.Heading}</h3>
          <Paragraph content={data.Home.SubHeading}/>
        </Col>

        <Col xs={4}>
          <Image src="https://insights.dice.com/wp-content/uploads/2019/07/Tell-Me-About-Yourself-Interview-Job-Interview-Interview-Questions-Dice.png" height="100%" width="75%" roundedCircle/>
        </Col>


        </Row>
      </Container>
      </Jumbotron>
      <div class="margindiv">

      

      <InterviewQuotes/>
      </div>
      </div>
    )
  }
}
 
export default Home