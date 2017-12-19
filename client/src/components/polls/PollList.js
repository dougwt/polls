import React, { Component } from 'react';

class PollList extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <h5 className="header section-title">{this.props.title}</h5>
        </div>
        <div className="row">
          <div className="collection">
            <a href="#!" className="collection-item">Sample Poll 1<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 2<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 3<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 4<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 5<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 6<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 7<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 8<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 9<span className="badge">1</span></a>
            <a href="#!" className="collection-item">Sample Poll 10<span className="badge">1</span></a>
          </div>

          <div className="center-align">
            <ul className="pagination">
              <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
              <li className="active"><a href="#!">1</a></li>
              <li className="waves-effect"><a href="#!">2</a></li>
              <li className="waves-effect"><a href="#!">3</a></li>
              <li className="waves-effect"><a href="#!">4</a></li>
              <li className="waves-effect"><a href="#!">5</a></li>
              <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PollList;
