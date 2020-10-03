import React, { Component } from 'react';

import Main from './components/Main';
import './App.scss';
import 'bulma';

class App extends Component {
	
  render() {
    return (
      <div className='app'>
        <Main />
      </div>
    );
  }
}

export default App;