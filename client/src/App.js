import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import Main from './components/Main';
import './App.scss';
import 'bulma';
import api from './utility/api';

class App extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.props.dispatch(api.getCurrentUser(success => {
      if (success) {
        return this.setState({
          loading: true
        })
      } else {
        return this.setState({
          loading: false
        })
      }
    }))
  }

  render() {
    const { loading } = this.state;
    return (
      <div className='app'>
        {
          loading ?
            <Main /> : (
              <div className="main-loader">
                <Loader
                  type="Audio"
                  color="#00BFFF"
                  height={50}
                  width={50}
                  timeout={3000} //3 secs
                />
              </div>
            )
        }
      </div>
    );
  }
}

export default connect(null)(App);