import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from 'material-ui/CssBaseline';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import './index.scss';

ReactDOM.render(
  <CssBaseline>
    <App />
  </CssBaseline>,
  document.getElementById('root')
);

registerServiceWorker();
