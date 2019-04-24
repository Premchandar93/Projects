import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
require('./testcss.css');

class ProjectMessages extends Component {
  render() {

    var allmsg = this.props.messages;
    var array = allmsg[this.props.opponent];
    if ( !array) { array = []; }


    return (
      <div className='messages' id='messageList'>
        <div className="chatboxclass" id="chatbox">
          { 
              array.map((msg,i)=> {
                if ( msg.message && msg.message !== '') {
                  if ( msg.username === this.props.name){
                    return (<div className='message from-me' key={i}>
                         <div className='message-body'>
                          {msg.message}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className='message ' key={i}>
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
    );
  }
}

ProjectMessages.defaultProps = {
  messages: {},
  opponent: ''
};

export default ProjectMessages;

