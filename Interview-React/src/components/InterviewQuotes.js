import React, { Component } from 'react' 
import { CardColumns } from 'react-bootstrap'
import data from './data'
import CardForQuotes from './CardForQuotes'

class InterviewQuotes extends Component {
  render() {
  
    return (
      <div>
        <CardColumns>
          <CardForQuotes/>
        </CardColumns>
      </div>
    )
  }
}
 
export default InterviewQuotes