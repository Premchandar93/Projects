import React, { Component } from 'react'
 
import {Card } from 'react-bootstrap'
import data from './data.js'

class CardForQuotes extends Component {
  render() {

    var quotes = data.Home.Quotes;
  
    return (
      <div>
      {
        quotes.map((quote, index) => (
          <Card key={index}>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <h6>
                {' '}
                {quote.content}{' '}
              </h6>
              <footer className="blockquote-footer">
                {quote.author}
              </footer>
            </blockquote>
          </Card.Body>
          </Card>
        ))
      }
      </div>

    )
  }
}
 
export default CardForQuotes
