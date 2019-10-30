import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../images/logo.min.svg';

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
          onClick={() => toggleNav(true)}
        >
          <i className="material-icons left">person</i>
            Sign In with Google
        </a>
      </li>
    );
  default:
    return (
      <ul>
        <li>
          <NavLink
            to="/polls"
            className="waves-effect waves-light"
            onClick={() => toggleNav(true)}
          >
            <i className="material-icons left">dashboard</i>
              Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/polls/new"
            className="waves-effect waves-light"
            onClick={() => toggleNav(true)}
          >
            <i className="material-icons left">add</i>
              Create a Poll
          </NavLink>
        </li>
        <li>
          <a
            href="/api/logout"
            className="navbar-item waves-effect waves-light"
            onClick={() => toggleNav(true)}
          >
            <i className="material-icons left">person</i>
              Sign Out
          </a>
        </li>
      </ul>
    );
  }
};

const toggleNav = (hide = false) => {
  const nav = document.getElementById('main-nav');

  if (hide || nav.className === 'unfold') {
    nav.className = '';
  } else {
    nav.className = 'unfold';
  }
};

export const Header = props => {
  /* eslint-disable no-script-url */
  return (
    <nav id="main-nav">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          <img src={logo} alt="Simple Polls" />
        </Link>

        <ul className="right">
          <ul className="responsive">{renderContent(props.auth)}</ul>

          <li className="toggle">
            <a href="javascript:void(0);" onClick={() => toggleNav()}>
              <i className="material-icons">menu</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
  /* eslint-enable no-script-url */
};
Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
