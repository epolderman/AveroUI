import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Table from './Table';
import MessageBar from './MessageBar';


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <MessageBar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/table/:tablenumber/:tableid" component={Table} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
