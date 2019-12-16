import React, { Component } from "react";
import {Navbar} from 'react-bootstrap'
import GoogleLogin from 'react-google-login';
import {
  toggleUserSignedIn
} from "../actions/actionCreator";
import { connect } from 'react-redux'
import cookie from 'react-cookies'
import data from './data.js'

class NavUser extends Component {

  constructor(props) {
    super(props);
    var signed_in_user = cookie.load(data.Developer.cookie_username);
    if ( signed_in_user ){
      this.props.toggleUserRedirect(signed_in_user);
    }
  }

  render() {
    const responseGoogle = (response) => {
      console.log(JSON.stringify(response))

      if ( response.hasOwnProperty('error') ){

      }
      else {
        this.props.toggleUserRedirect(response.w3.ig);
        cookie.save(data.Developer.cookie_username, response.w3.ig, {
          path : '/',
          maxAge : data.cookies_expiration_time,
        });
      }
    }

    return (
      <div>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        {this.props.redirect_status ? 
          (
            <a> {this.props.redirect_username} </a>
          )
          :
          (
            <GoogleLogin
              clientId= {data.Developer.clientId}
              buttonText="Sign in "
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          )
        }
        </Navbar.Text>
      </Navbar.Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({ 
    redirect_status : state.userRedirect.status,
    redirect_username : state.userRedirect.username,
    cookies : ownProps.cookies
 });
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleUserRedirect : (status) => dispatch(toggleUserSignedIn(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavUser);