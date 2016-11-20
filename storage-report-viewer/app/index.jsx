import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import './assets/base.scss';

import data from './assets/flare.json';

// add in performance tooling in dev
if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf');
}

ReactDOM.render(
  (
    <App data={data} />
  ),
  document.getElementById('storage-report-viewer')
);
