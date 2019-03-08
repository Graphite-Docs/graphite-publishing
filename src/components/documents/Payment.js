import React, { Component } from 'reactn';
import {
  isSignInPending,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
  loadUserData,
  isUserSignedIn
} from 'blockstack';
import {
  personalPlan,
  teamPlan,
  proPlan
} from '../helpers/paymentsDev';
import FeatureTable from './FeatureTable';

export default class Payment extends Component {

  componentDidMount() {
    this.personalPlan = personalPlan.bind(this);
    this.teamPlan = teamPlan.bind(this);
    this.proPlan = proPlan.bind(this);
    isUserSignedIn ? personalPlan() : loadUserData();
    isUserSignedIn ? teamPlan() : loadUserData();
    isUserSignedIn ? proPlan() : loadUserData();
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }


  handleSignIn(e) {
    e.preventDefault();
    const origin = window.location.origin
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {

    return (
      <div>
        <div className="payment-wrapper">
          <div className="container center-align">
            <h3>Your free trial has ended.</h3>
            <p>If you would like to continue, choose a plan below.</p>
            <div className="row">

            <div className=" col s12 m4">
              <div className="card">

                <div className="card-content center">
                  <h5 className=''>Personal</h5>
                </div>
                  <div className="card-content center">
                    <h2 className='blue-text'><small>$</small>19.99</h2>
                    <p>Per Month</p>
                  </div>

                <ul className='collection center'>
                      <li className='collection-item'>
                        <strong>2</strong> Units
                  </li>
                      <li className='collection-item'>
                        <strong>30GB</strong> Data
                  </li>
                </ul>

                <div className="card-content center">
                  <div className="row">
                    <div className="col s12">
                    <form id="personalPlan" action="https://wt-3fc6875d06541ef8d0e9ab2dfcf85d23-0.sandbox.auth0-extend.com/personal-plan" method="POST" >
                    </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>



            <div className=" col s12 m4">
              <div className="card">

                <div className="card-content center">
                  <h5 className=''>Team</h5>
                </div>
                  <div className="card-content center">
                    <h2 className='red-text '><small>$</small>59.99</h2>
                    <p>Per Month</p>
                  </div>

                  <ul className='collection center'>
                    <li className='collection-item'>
                      <strong>5</strong> Units
                      </li>
                    <li className='collection-item'>
                      <strong>100GB</strong> Data
                    </li>
                </ul>

                <div className="card-content center">
                  <div className="row">
                    <div className="col s12">
                    <form id="teamPlan" action="https://wt-3fc6875d06541ef8d0e9ab2dfcf85d23-0.sandbox.auth0-extend.com/team-plan" method="POST" >
                    </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>

              <div className=" col s12 m4">
              <div className="card">
                <div className="card-content center">
                  <h5 className=''>Professional</h5>
                </div>
                  <div className="card-content center">
                    <h2 className='purple-text '><small>$</small>199.99</h2>
                    <p>Per month</p>
                  </div>

                <ul className='collection center'>
                      <li className='collection-item'>
                        <strong>20</strong> Units
                  </li>
                      <li className='collection-item'>
                        <strong>Unlimited</strong> Data
                  </li>
                </ul>
                <div className="card-content center">
                  <div className="row">
                    <div className="col s12">
                    <form id="proPlan" action="https://wt-3fc6875d06541ef8d0e9ab2dfcf85d23-0.sandbox.auth0-extend.com/pro-plan" method="POST" >
                    </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col s12">
              <h6>Enterprise plans are also available with custom contract terms and custom pricing to meet your needs.
              If you are interested, <a href="mailto:contact@graphitedocs.com">contact us here</a>.</h6>
            </div>
            <p>If you do not wish to continue, you can export your data <a>here</a>.</p>
            </div>
            <FeatureTable />
          </div>
        </div>
      </div>
    );
  }
}
