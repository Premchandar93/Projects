import React, { Component } from 'react';
//import './App.css';
import ChatApp from './ChatApp.js'

require('./testcss.css');


class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    this.state = {
      showchat: '',
      name: '',
    };

  }

  componentDidMount(){
    document.getElementById("logintext").focus();
  }

  usernameChangeHandler(event) {
    this.setState({ name: event.target.value });
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ showchat: true, name: this.state.name });
  }

  render() {

    if ( this.state.showchat ){
      return (
          <ChatApp name={this.state.name}/>
        )
    }
    else{
      return (
        <form onSubmit={this.usernameSubmitHandler} className="username-container">
          <h1>Chat Box</h1>
          <div>
            <input
              id="logintext"
              type="text"
              onChange={this.usernameChangeHandler}
              placeholder="Enter a username..."
              required />
          </div>
          <input type="submit" value="Go" />
        </form>
      );
    }

  }
}



export default LoginApp;