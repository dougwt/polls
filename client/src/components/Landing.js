import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
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
              <h1 className="header center">Make. Choices. Easier.</h1>
              <div className="row center">
                <h5 className="header col s12 light">
                  A community for creating, finding, and sharing simple polls.
                </h5>
              </div>
              <div className="row center">
                <a
                  href="/auth/google"
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
                    <i className="material-icons">flash_on</i>
                  </h2>
                  <h5 className="center">Lorem ipsum dolor</h5>

                  <p className="light">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere voluptatibus harum quam, odio ipsa tempora asperiores
                    earum omnis deleniti obcaecati sint cum vel inventore
                    consequuntur voluptatem blanditiis, deserunt in ex hic!
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center">
                    <i className="material-icons">group</i>
                  </h2>
                  <h5 className="center">Lorem ipsum dolor</h5>

                  <p className="light">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Vitae cum eius cumque totam praesentium ducimus voluptatem
                    recusandae distinctio nemo? Architecto suscipit maxime ea
                    dolorem aliquid ipsam repellendus dolore, totam laboriosam
                    ullam accusamus!
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center">
                    <i className="material-icons">settings</i>
                  </h2>
                  <h5 className="center">Lorem ipsum dolor</h5>

                  <p className="light">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Provident voluptatem ducimus, nostrum perspiciatis ipsa.
                    Ducimus, vitae. Officiis officia praesentium, saepe
                    reiciendis est ex ducimus obcaecati! Dolore, cupiditate,
                    nesciunt!
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="wrapper section-4">
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 center">
                <h3>
                  <i className="mdi-content-send brown-text" />
                </h3>
                <h4>Contact Us</h4>
                <p className="left-align light">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eligendi necessitatibus numquam, dolores qui facere magni
                  vitae odio laboriosam architecto nulla modi earum a voluptates
                  libero cum, ad dolore omnis voluptatem consequatur ea,
                  blanditiis velit aliquam adipisci est. Consectetur, dolores,
                  cum!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div className="wrapper section-5 bg">
        <div className="bg-image-container">
          <div className="bg-image" />
        </div>
        <div className="bg-container">
          <div className="container">
            <div className="section">
              <div className="row center">
                <h5 className="header col s12 light">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
