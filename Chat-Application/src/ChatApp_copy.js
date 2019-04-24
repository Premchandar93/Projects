import React, { Component } from 'react';
//import './App.css';
import openSocket from 'socket.io-client';
import { Button, Card, ListGroup, Badge, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

require('./testcss.css');

class ChatApp extends Component {
  constructor(props) {
    console.log('inside constructor');
    super(props);
    this.handleclick = this.handleclick.bind(this);
    this.sendnotifications = this.sendnotifications.bind(this);
    this.updateclicked = this.updateclicked.bind(this);

    this.state = {
      socket: openSocket('/'),
      messages: {},
      users: 0,
      name: 'user'+ Math.floor(Math.random() * 1000), 
      user_list: [],
      opponent: '',
      notifications: {},
    };


    this.state.socket.emit('setname', this.state.name);
    console.log('client emit setname');

    this.state.socket.on('users_list', list => {
      console.log('server sent users_list');
      console.log(JSON.stringify(list));
      this.setState({
        user_list : list.list
      })
    })

    this.state.socket.on('users_online', count => {
      console.log('server sent users_online '+ count);
      if ( count <= 1) {
        document.getElementById("textmsg").disabled = true;

        this.setState({
          messages: {},
          opponent: '',
          notifications: {},
          users: 0,
        })

      }
      else {
        this.setState({
          users: count-1,
        });
      }
    })

    this.state.socket.on('usermessage', msg => {
      console.log('server sent message ');
      console.log(JSON.stringify(msg));
      var allmsg = this.state.messages;
      var array = allmsg[msg.username];
      if ( !array) { array = []; }
      array.push(msg);
      allmsg[msg.username] = array;

      if ( this.state.opponent !== msg.username) {

        var toastmsg = msg.username + ':- ' + msg.message;
        this.sendnotifications(toastmsg);


        var notify = this.state.notifications;
        if ( notify[msg.username] > 0) {
          notify[msg.username] += 1;
        }
        else {
          notify[msg.username] = 1;
        }
        this.setState({
          messages: allmsg,
          notifications: notify
        });
      }
      else{
        this.setState({
          messages: allmsg
        });
      }
    })


  }

  sendnotifications(toastmsg) {

    toast.info(toastmsg,{
      bodyClassName: css({
        fontSize: '20px'
      })
    });
  }

  componentDidMount(){

      console.log('componentDidMount');
      var input = document.getElementById("textmsg");
      input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementById("click").click();
        }
      })
  }

  updateclicked(e) {
    console.log('updateclicked');
    if ( this.state.opponent !== e.name ){
      document.getElementById("textmsg").disabled = false;
      document.getElementById("textmsg").focus();
      var notify = this.state.notifications;
      notify[e.name] = 0;
      this.setState({
        opponent: e.name,
        notifications: notify
      })
    }
  }


  handleclick(){


    console.log('handleclick');
    var isdisabled =document.getElementById("textmsg").disabled;

    if ( isdisabled === false){
      //const out = document.getElementById("chatbox")
      //const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1
      //out.scrollTop = out.scrollHeight - out.clientHeight

      var val = document.getElementById("textmsg").value;
      var allmsg = this.state.messages;
      var array = allmsg[this.state.opponent];
      if ( !array) { array = []; }
      array.push({ username: this.state.name, message: val});
      allmsg[this.state.opponent] = array;

      this.setState({
        messages: allmsg
      })      
      
      var component = {
        value: val,
        receiver: this.state.opponent,
        sender: this.state.name,
      };

      this.state.socket.emit('click',component);
      document.getElementById("textmsg").value = '';
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
      var messages = this.state.messages[this.state.opponent];
      if ( !messages) { messages = []; }
      if ( messages.length > 0 ){
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
      }
  }


  render() {
      var allmsg = this.state.messages;
      var array = allmsg[this.state.opponent];
      if ( !array) { array = []; }

      if ( this.state.users < 1 ){

          return (
            <div className="container">
              <h3>Chat Box <br/>
              <h6>Username: {this.state.name}</h6>
              <ToastContainer hideProgressBar newestOnTop autoClose={3000} closeOnClick/>
              </h3>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixedTop>
                  <Navbar.Brand href="#home">Active Users <Badge variant="light"> {this.state.users } </Badge> </Navbar.Brand>

                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>

                  </Navbar.Collapse>
                  
                </Navbar>


              <div className='messages' id='messageList'>
                


                <div className="chatboxclass" id="chatbox">
                  { 
                      array.map((msg,i)=> {
                        if ( msg.message && msg.message !== '') {
                          if ( msg.username === this.state.name){
                            return (<div className='message from-me' key={i}>
                                 <div className='message-body'>
                                  {msg.message}
                                </div>
                              </div>
                            );
                          }
                            
                          return (<div className='message ' key={i}>
                              
                              <div className='message-body'>
                                <div className='username'>
                                {msg.username}
                                </div>
                                {msg.message}
                              </div>
                            </div>
                          );
                        }
                        return '';
                      }) 
                  } 
                        
                </div>          
              </div>
              <div className="chat-input">
                <input type="text"
                  name="textmsg"
                  id="textmsg"
                  disabled
                  placeholder="Enter your message and press enter..."
                  required />
                <Button style={{display:'none'}} className="primary" name='click' id="click" onClick={this.handleclick}>Click Me</Button>
              </div>
            </div>
          );
      }

      else{
          return (
            <div className="container">
              <h3>Chat Box <br/>
              <h6>Username: {this.state.name}</h6>
              <ToastContainer hideProgressBar newestOnTop autoClose={3000} closeOnClick/>
              </h3>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixedTop>
                  <Navbar.Brand href="#home">Active Users <Badge variant="light"> {this.state.users } </Badge> </Navbar.Brand>

                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      <div id="navdropdowndiv">
                      <NavDropdown title="View Users" id="collasible-nav-dropdown">
                        {
                          this.state.user_list.map( ( name, i ) => {
                            var notify = this.state.notifications[name];
                            if (!notify) { notify = 0;}
                            if ( name !== this.state.name ) {
                              if ( notify > 0 ) {
                                return <div><NavDropdown.Item href={"#"+i+'link'} key={i}  onClick={(e) => { e.preventDefault(); this.updateclicked({name});}}>{name} <Badge variant="dark"> {notify} </Badge></NavDropdown.Item></div>
                              }
                              else{
                                return <div><NavDropdown.Item key={i} href={'#' + i + 'link'} onClick={(e) => { e.preventDefault(); this.updateclicked({name});}}>{name}</NavDropdown.Item></div>
                              }
                            }
                            return '';
                          })
                        }
                      </NavDropdown>
                      </div>


                    </Nav>

                  </Navbar.Collapse>
                  
                </Navbar>


              <div className='messages' id='messageList'>
                


                <div className="chatboxclass" id="chatbox">
                  { 
                      array.map((msg,i)=> {
                        if ( msg.message && msg.message !== '') {
                          if ( msg.username === this.state.name){
                            return (<div className='message from-me' key={i}>
                                 <div className='message-body'>
                                  {msg.message}
                                </div>
                              </div>
                            );
                          }
                            
                          return (<div className='message ' key={i}>
                              
                              <div className='message-body'>
                                <div className='username'>
                                {msg.username}
                                </div>
                                {msg.message}
                              </div>
                            </div>
                          );
                        }
                        return '';
                      }) 
                  } 
                        
                </div>          
              </div>
              <div className="chat-input">
                <input type="text"
                  name="textmsg"
                  id="textmsg"
                  disabled
                  placeholder="Enter your message and press enter..."
                  required />
                <Button style={{display:'none'}} className="primary" name='click' id="click" onClick={this.handleclick}>Click Me</Button>
              </div>
            </div>
          );
      }

  }
}



export default ChatApp;
