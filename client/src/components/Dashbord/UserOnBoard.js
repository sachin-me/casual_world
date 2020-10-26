import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateBoard from './CreateBoard';
import actions from '../../store/actions';
import noContent from '../../images/no-content.svg';
import Sidebar from '../../containers/Sidebar';
import { Container, Row, Col, Card } from 'react-bootstrap';

class UserOnBoard extends Component {
  componentDidMount = () => {
    this.props.dispatch(actions.getBoards());
  };
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col xs={6}>
            <Card style={{ width: '28rem' }} className="mx-auto">
              <Card.Img variant="top" src={noContent} />
              <Card.Body>
                <Card.Title className="text-center">
                  Stay on track and up to date
                </Card.Title>
                <Card.Text className="text-center">
                  Invite people to boards and cards, add due dates, and we'll
                  show the most important activity here.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h5>LINKS</h5>
            <CreateBoard />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(null)(UserOnBoard);
