import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Work from './components/work.component';
import View from './components/view.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">My Application</Link>
            <div className="navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/work'} className="nav-link">Add my work</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Add Task</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">View History</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/work' component={ Work } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
              <Route path='/view/:id' component={ View } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;