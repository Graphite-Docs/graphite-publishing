import React, { Component } from 'react';

export default class FeatureTable extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	}
  }


  render() {
    return (
      <div className="container">
      <table className="features-table centered">
          <thead>
            <tr>
                <th>Features</th>
                <th>Personal</th>
                <th>Team</th>
                <th>Pro</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Feature</td>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>$3.76</td>
            </tr>
            <tr>
              <td>Feature</td>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
            <tr>
              <td>Feature</td>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
