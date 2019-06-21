import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Movie from './Movie.js';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.fetchmovie = this.fetchmovie.bind(this);
    this.fetchprediction = this.fetchprediction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMovieChange = this.handleMovieChange.bind(this);
    this.handlePredictClick = this.handlePredictClick.bind(this);
    this.handleCancelClick= this.handleCancelClick.bind(this)

    this.state = {
      isLoading: false,
      formData: {
        thriller: 0,
        drama: 0,
        comedy: 0,
        horror: 0
      },
      result: "",
      moviename: '',
      movieinfo: ''
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handleMovieChange =(event) => {
    const value = event.target.value;
    const name = event.target.name;
    //alert(name + ' = '+ value);
    this.setState({
      name: value
    });

  }

  fetchmovie(moviename){
    //alert('moviename = '+ moviename);
    var url = new URL("http://www.omdbapi.com") ;
    var params = {t: "'"+ moviename + "'" ,apikey:'b2aab74f'};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    axios.get(url)
    .then(response => {
      console.log(JSON.stringify(response));
      //alert(response)
      var obj = JSON.stringify(response);

      return JSON.parse(obj);
    })
    .then(response => {
      //alert('then then = '+ response.data);
      console.log('movie data = ');
      console.log(JSON.stringify(response.data));
      //alert('title= '+response.data.Title);
      var formdata = {};

      //formdata['IMDBRATING'] = parseInt(response.data.imdbRating);
      //var runtime = response.data.Runtime.match(/\d+/g);
      //formdata['RUNTIME'] = parseInt(runtime[0]);

      var list = ['Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy','History','Horror','Music','Musical','Mystery','Romance','Sci-Fi','Short','Sport','Thriller','War','Western'];
      //var list = ['Thriller','Drama'];

      for (var i = 0; i < list.length; i++) { 
        if ( response.data.Genre.search(list[i]) >= 0 ){
          formdata[list[i].toLowerCase()] = 1;
        }
        else{
          formdata[list[i].toLowerCase()] = 0;
        }
      }
      //alert(JSON.stringify(formdata));
      this.setState({
        formData: formdata,
        movieinfo: response.data
      })
      this.fetchprediction(formdata);

    })
    .catch(error => {
      //alert('inside catch');
      this.setState({
        result: 'No movie found',
        isLoading: false
      })
    });
  }

  handlePredictClick = (event) => {
    //const formData = this.state.formData;
    //alert('formdata='+ JSON.stringify(formData));
    this.setState({ isLoading: true, result: '' });
    var value = document.getElementById('moviename').value;
    //alert(value);
    this.fetchmovie(value);
  }

  fetchprediction(formdata){
    console.log('fetchprediction formdata= ===');
    console.log(formdata);
    //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    fetch('http://localhost:5000/prediction/', 
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formdata)
      })
      .then(response => {
        console.log('response from post');
         console.log(JSON.stringify(response));
         return response.json()
      })
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    var thrillers = []
    for (var i = 0; i <= 1; i = i + 1) {
      thrillers.push(<option key = {i} value = {i}>{i}</option>);
    }
    var dramas = []
    for (var i = 0; i <= 1; i = i + 1) {
      dramas.push(<option key = {i} value = {i}>{i}</option>);
    }
    var comedys = []
    for (var i = 0; i <= 1; i = i + 1){
      comedys.push(<option key = {i} value = {i}>{i}</option>);
    }
    var horrors = []
    for (var i = 0; i <= 1; i = i + 1) {
      horrors.push(<option key = {i} value = {i}>{i}</option>);
    }
    return (
      <Container>
        <div>
          <h1 className="title"> Movie Classifier</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Movie Name</Form.Label>
                <Form.Control 
                  type="text"
                  id="moviename"
                  name="moviename"
                  onChange={this.handleMovieChange}>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          <br/><br/>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
              <Movie movie={this.state.movieinfo}/>
            </Row>
            )
          }
        </div>
      </Container>
    );
  }
}

/*
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Thriller</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.thriller}
                  name="thriller"
                  onChange={this.handleChange}>
                  {thrillers}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Drama</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.drama}
                  name="drama"
                  onChange={this.handleChange}>
                  {dramas}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Comedy</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.comedy}
                  name="comedy"
                  onChange={this.handleChange}>
                  {comedys}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Horror</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.horror}
                  name="horror"
                  onChange={this.handleChange}>
                  {horrors}
                </Form.Control>
              </Form.Group>
            </Form.Row>
*/

export default App;