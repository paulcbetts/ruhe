// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootElem = document.getElementById('root');
if (rootElem) ReactDOM.render(<App />, rootElem);
registerServiceWorker();
