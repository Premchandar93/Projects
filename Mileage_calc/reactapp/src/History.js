import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import History from './History.js';
import { ListGroup, Table } from 'react-bootstrap';

class App extends Component {

  state = {
    mileagelist : []
  }

  componentDidMount(){
   
    var getmileage = async() =>  {
        const res = await fetch('/getlist',{
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const body = await res.json();
        var newarray = body.map(item => {
          var d = new Date(item.date);
          item.date = d.toDateString();
          return item;
        })

        this.setState({
          mileagelist : newarray,
        });

    };
     //[{"mileage":39.951},{"mileage":38.820699999999995},{"mileage":39.9514},{"mileage":39.9514},{"mileage":39.753}]

     getmileage();

    }


  render() {
    return (
      <div>
        <div>
          <h3> History </h3>
          <br/>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date </th>
                <th>Mileage (KMPL)</th>
              </tr>
            </thead>
            <tbody>

            {
              this.state.mileagelist.map( ( item,i ) => {
                return <tr><td>{i+1}</td><td>{item.date}</td><td>{item.mileage.toFixed(2)}</td></tr>
              })
            }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
