import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PollNew from './polls/PollNew';
import Poll from './polls/Poll';
import './App.css';

export class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/polls/new" component={PollNew} />
            <Route path="/polls/:pollId" component={Poll} />
            <Route path="/polls" component={Dashboard} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};

export default connect(null, actions)(App);
