import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Root from './components/Root';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
  }
}

export default App;
