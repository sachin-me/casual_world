import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import banner from '../../../images/banner.svg';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

class Hero extends Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <div className="mt-5">
                <h1>
                  It lets you work more collaboratively and get more done.
                </h1>
                <p>
                  It’s boards, lists, and cards enable you to organize and
                  prioritize your projects in a fun, flexible, and rewarding
                  way.
                </p>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            </Col>
            <Col>
              <Image src={banner} />
            </Col>
          </Row>
        </Container>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Hero;
