import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l9 s12">
            <h5 className="white-text">Simple Polls</h5>
            <p className="grey-text text-lighten-3">
              <strong>Hello!</strong> Thank you for visiting. This webapp was
              created as a practice exercise for <a href="#">my portfolio</a>{' '}
              and should be considered very
              <em>experimental</em>. It was developed in JavaScript using React
              and Express. To find out more, or to view the source code, visit
              the <a href="#">GitHub repository</a>.
            </p>
          </div>
          <div className="col l3 s12 nav">
            <h5 className="white-text">Site Navigation</h5>
            <ul>
              <li>
                <a className="white-text" href="#!">
                  Homepage
                </a>
              </li>
              <li>
                <a className="white-text" href="#!">
                  Dashboard
                </a>
              </li>
              <li>
                <a className="white-text" href="#!">
                  Create a Poll
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          Made with <span className="heart">&#9829;</span> by{' '}
          <a className="text-lighten-3" href="https://dougwt.com">
            @dougwt
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
