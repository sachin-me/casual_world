import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Footer from './Footer';
import banner from '../../../images/banner.svg';

class Hero extends Component {
  render() {
    return (
      <>
        <section className="hero is-medium is-light is-bold">
          <div className="hero-body">
            <div className="container columns">
              <div className="column">
                <h1 className="title">
                  It lets you work more collaboratively and get more done.
                </h1>
                <h2 className="subtitle">
                  It’s boards, lists, and cards enable you to organize and
                  prioritize your projects in a fun, flexible, and rewarding
                  way.
                </h2>
                <Link to="/signup" className="signup-btn">
                  <button className="button is-link">Sign up</button>
                </Link>
              </div>
              <div className="column">
                <img className="image is-256x256" src={banner} />
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </section>
      </>
    );
  }
}

export default Hero;
