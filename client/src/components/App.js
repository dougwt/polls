import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">

          <Header />

          <main className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/polls" component={Dashboard} />
              <Route path="/polls/new" component={Dashboard} />
          </main>

          <Footer />

        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
