import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Landing.css';

export const Landing = props => {
  if (props.auth) {
    props.history.push('/polls');
  }

  return (
    <main>
      {/* Section 1 */}
      <div className="wrapper section-1 bg">
        <div className="bg-image-container">
          <div className="bg-image" />
        </div>
        <div className="bg-container">
          <div className="container">
            <div className="section">
              <h1 className="header center">Crowdsource Everyday Decisions</h1>
              <div className="row center">
                <h5 className="header col s12 light">
                  A community for creating, finding, and sharing simple polls.
                </h5>
              </div>
              <div className="row center">
                <a
                  href="/api/auth/google"
                  id="download-button"
                  className="btn-large waves-effect waves-light"
                >
                  Join For Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="wrapper section-2">
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center">
                    <i className="material-icons">create</i>
                  </h2>
                  <h5 className="center">Create</h5>

                  <p className="light center">
                    Create unlimited polls using an easy-to-use modern web
                    interface
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center">
                    <i className="material-icons">search</i>
                  </h2>
                  <h5 className="center">Browse</h5>

                  <p className="light center">
                    Browse polls created by others to view and contribute your
                    opinions
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center">
                    <i className="material-icons">share</i>
                  </h2>
                  <h5 className="center">Share</h5>

                  <p className="light center">
                    Share interesting polls to spark conversation with friends
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="wrapper section-3 bg">
        <div className="bg-image-container">
          <div className="bg-image" />
        </div>
        <div className="bg-container">
          <div className="container">
            <div className="section">
              <div className="row center">
                <h5 className="header col s12 light">
                  Sometimes asking others what they think can help you to
                  discover your own true feelings
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="wrapper section-4 bg">
        <div className="bg-image-container">
          <div className="bg-image" />
        </div>
        <div className="bg-container">
          <div className="container">
            <div className="section">
              <div className="row center">
                <h5 className="header col s12 light">
                  Hone your decision-making instincts by joining our community
                  of opinionated users.
                </h5>
              </div>
              <div className="row center">
                <a
                  href="/api/auth/google"
                  id="download-button"
                  className="btn-large waves-effect waves-light"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
Landing.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Landing);
