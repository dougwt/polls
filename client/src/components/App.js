import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PollNew from './polls/PollNew';
import PollDetail from './polls/PollDetail';

export class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">

          <Header />

          <Route exact path="/" component={Landing} />
          <Route exact path="/polls" component={Dashboard} />
          <Route exact path="/polls/new" component={PollNew} />
          <Route exact path="/polls/1" component={PollDetail} />

          <Footer />

        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
