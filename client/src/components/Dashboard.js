import React, { Component } from 'react';
import PollList from './polls/PollList';

class Dashboard extends Component {
  componentDidMount() {
    window.$('ul.tabs').tabs();
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a href="#test1">My Polls</a></li>
                <li className="tab col s3"><a href="#test2">Other Polls</a></li>
              </ul>
            </div>
            <div id="test1" className="col s12">
              <PollList title="Polls Created by You" />
            </div>
            <div id="test2" className="col s12">
              <PollList title="Polls Created by Other Users" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
