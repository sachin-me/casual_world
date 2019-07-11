import React, { Component } from 'react';

import Main from './components/Main';
import './App.scss';
import 'bulma';

class App extends Component {
	componentDidMount() {
		(function() {
		  if('serviceWorker' in navigator) {
		    navigator.serviceWorker.register('./firebase-messaging-sw.js');
		  }
		})();
	}
  render() {
    return (
      <div className='app'>
        <Main />
      </div>
    );
  }
}

export default App;