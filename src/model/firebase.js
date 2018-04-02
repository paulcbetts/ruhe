// @flow

import * as firebase from 'firebase';
require('firebase/firestore');

const testConfig = {
  apiKey: 'AIzaSyA0og4HurFmXRj-Xczx7k7o0byUImh56ZU',
  authDomain: 'ruhe-test.firebaseapp.com',
  databaseURL: 'https://ruhe-test.firebaseio.com',
  projectId: 'ruhe-test',
  storageBucket: '',
  messagingSenderId: '485211227115'
};

const devConfig = {
  apiKey: 'AIzaSyDJ1KKEIKXJcLHZ0Ct0l7DGaUcjsVRw7Ag',
  authDomain: 'ruhe-dev.firebaseapp.com',
  databaseURL: 'https://ruhe-dev.firebaseio.com',
  projectId: 'ruhe-dev',
  storageBucket: 'ruhe-dev.appspot.com',
  messagingSenderId: '914234708463'
};

if (process.env.NODE_ENV === 'test') {
  console.log('Initializing in Test Mode\n');
  firebase.initializeApp(testConfig);
} else if (process.env.NODE_ENV === 'production') {
  throw new Error('TODO: Set me up');
} else {
  firebase.initializeApp(devConfig);
}

export default firebase;