import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const renderContent = auth => {
  switch (auth) {
  case null:
    return;
  case false:
    return (
      <li>
        <a
          href="/auth/google"
          className="navbar-item waves-effect waves-light"
        >
          <i className="material-icons left">person</i>
            Sign In with Google
        </a>
      </li>
    );
  default:
    return (
      <li>
        <a
          href="/api/logout"
          className="navbar-item waves-effect waves-light"
        >
          <i className="material-icons left">person</i>
            Sign Out
        </a>
      </li>
    );
  }
};

export const Header = props => {
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
          {renderContent(props.auth)}
        </ul>
      </div>
    </nav>
  );
};
Header.propTypes = {
  auth: PropTypes.object
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
