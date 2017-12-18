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
          <a href="/auth/google" className="navbar-item">
            Sign In with Google
          </a>
        );
      default:
        return <a href="/api/logout" className="navbar-item">Sign Out</a>;
    }
  }

  render() {
    return (
      <header>
        <nav className="navbar is-light">

          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Simple Polls
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink to="/polls" className="navbar-item">View Polls</NavLink>
              <NavLink to="/polls/new" className="navbar-item">Create a Poll</NavLink>
            </div>
            <div className="navbar-end">
              {this.renderContent()}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
