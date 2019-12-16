import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import AddFeedback from './components/AddFeedback'
import ViewExperience from './components/ViewExperience'
import AddInterview from './components/AddInterview';
import ViewFeedback from './components/ViewFeedback';
import ViewTags from './components/ViewTags';
import Analytics from './components/Analytics'
import cookie from 'react-cookies'
import data from './components/data'
import Title from './components/Title'
import Paragraph from './components/Paragraph'
import Home from './components/Home';


class App extends Component {

  render() {
    var signed_in_user = cookie.load(data.Developer.cookie_username);
    console.log("signed_in_user = "+ signed_in_user);
    if ( data.Developer.admin_users[signed_in_user] === 1 ){
      return (
        <Router>
              <NavBar/>
              <Switch>
                <Route exact path='/addexperience' render = { () => (<AddInterview cookies={this.props.cookies}/>)} />
                <Route exact path='/addfeedback' render = { () => (<AddFeedback cookies={this.props.cookies}/>)} />
                <Route exact path='/viewexperience' render = { () => (<ViewExperience cookies={this.props.cookies}/>)} />
                <Route exact path='/viewfeedback/:id' component={ViewFeedback}/>
                <Route exact path='/editinterview/:id' component={AddInterview}/>
                <Route exact path='/viewtags' component={ViewTags}/>
                <Route exact path='/analytics' component={Analytics}/>
                <Route exact path='/' component={Home}/>
              </Switch>
        </Router>
      );
    }
    else {
      return (
        <div>
          <NavBar/>
          <div className="text-center">

            <Title name={data.Developer.error_title} />
            <Paragraph content={data.Developer.error_content} />
          </div>
        </div>
      );
    }
  }
}

export default withCookies(App);
