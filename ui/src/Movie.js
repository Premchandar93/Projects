import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Movie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movie: this.props.movie
    };
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    const url = "https://www.imdb.com/title/"+ this.state.movie.imdbID;

    return (

      <Container>
        <CardGroup>  
          <Card>
            <Card.Header>{this.state.movie.Title} {this.state.movie.Year}</Card.Header>
            <Image src={this.state.movie.Poster} fluid />
            <Card.Footer>
              <small className="text-muted"><a href={url}>View in IMDB </a></small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Movie Plot</Card.Title>
              <Card.Text>
                {this.state.movie.Plot}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroupItem> <h5> Genre </h5> {this.state.movie.Genre} </ListGroupItem>
              <ListGroupItem> <h5> ImDB rating </h5> {this.state.movie.imdbRating} </ListGroupItem>
              <ListGroupItem> <h5> Director </h5> {this.state.movie.Director} </ListGroupItem>
              <ListGroupItem> <h5> Runtime </h5> {this.state.movie.Runtime} </ListGroupItem>
            </ListGroup>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}


export default Movie;