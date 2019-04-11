import React, { Component } from 'react';
import { Button, Alert, Card, Form, Row, Col, Container, Jumbotron } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css'; 
import logo from './logo.svg';
import './App.css';
import History from './History.js';

class App extends Component {
  constructor(){
    super();
    this.calculatemileage = this.calculatemileage.bind(this);
    this.handlestartvalue = this.handlestartvalue.bind(this);
    this.handleendvalue = this.handleendvalue.bind(this);
    this.handlequantity = this.handlequantity.bind(this);
    this.handleprice = this.handleprice.bind(this);
    
  }

  state = {
    startvalue: 0,
    endvalue: 0,
    quantity: 0,
    price: 0,
    result: null
  };

  calculatemileage = async(e) =>  {
    e.preventDefault();


    const res = await fetch('/calculate',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: this.state.startvalue,
        end: this.state.endvalue,
        quantity: this.state.quantity,
        price: this.state.price        
      }),
    });
    const body = await res.json();

    if ( body.userstatus == 'SUCCESS') {
      this.setState({
        result: "Mileage is " + body.value  
      });

    }
  }


  handlestartvalue(e){
    this.setState({
      startvalue: e.target.value,
    })
  }

  handleendvalue(e) {
      this.setState({
      endvalue: e.target.value,
    })
  }

  handlequantity(e){
    this.setState({
      quantity: e.target.value,
    })
  }

  handleprice(e){
    this.setState({
      price: e.target.value,
    })
  }



  render() {
    return (

        <Container>
          <Jumbotron>
            <h1>Mileage Calculator</h1>
            <p>
              A simple application based on react and node JS for calculating the mileage, <br/> also showing the past results from data stored persistly in MongoDB.
            </p>
          </Jumbotron>

          <Row>
            
            <Col>
              <h3> Calculator </h3>
              <br/>
              <Form  noValidate onSubmit={this.calculatemileage}>
                <Form.Group controlId="startvalue">
                  <Form.Control type="text" name="start" value={this.startvalue} onChange={this.handlestartvalue} placeholder="Enter the starting distance (KM)" />
                </Form.Group>

                <Form.Group controlId="endvalue">
                  <Form.Control type="text" name="end" value={this.endvalue} onChange={this.handleendvalue} placeholder="Enter the ending distance (KM)" />
                </Form.Group>

                <Form.Group controlId="quantity">
                  <Form.Control type="text" name="quantity" value={this.quantity} onChange={this.handlequantity} placeholder="Enter the Petrol quantity (Rs)" />
                </Form.Group>


                <Form.Group controlId="price">
                  <Form.Control type="text" name="price" value={this.price} onChange={this.handleprice} placeholder="Enter the Petrol price (Rs per litre)" />
                </Form.Group>

                <Row>
                <Col>
                  <Card style={{ height:'100px'}}>
                    <Card.Body> 
                    <Card.Title> Result </Card.Title>
                    <Card.Text>
                      <div id="result"> {this.state.result} </div> 
                    </Card.Text>

                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Row><br/></Row>
                  <Button variant="primary" type="submit">
                    Calculate
                  </Button>
                </Col>
                </Row>
              </Form>


                      
            </Col>
            <Col>
              <History/>
            </Col>
          </Row> 
        </Container>

    );
  }
}

export default App;
         // <h1> History </h1>
         // <br/>
