import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return  (
          <li>
            <a href="/auth/google" className="navbar-item waves-effect waves-light">
              <i className="material-icons left">person</i>
              Sign In with Google
            </a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout" className="navbar-item waves-effect waves-light">
              <i className="material-icons left">person</i>
              Sign Out
            </a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            Simple Polls
          </Link>

          <ul className="right">
            <li>
              <NavLink to="/polls" className="waves-effect waves-light">
                <i className="material-icons left">dashboard</i>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/polls/new" className="waves-effect waves-light">
                <i className="material-icons left">add</i>
                Create a Poll
              </NavLink>
            </li>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
