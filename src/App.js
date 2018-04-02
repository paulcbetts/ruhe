// @flow

import React from 'react';
import firebase from './model/firebase';

import logo from './logo.svg';
import './App.css';

export default function App() { 
  const makeADatabass = async () => {
    const db = firebase.firestore();

    await db.collection('users').add({
      name: 'foo',
      createdAt: Date.now(),
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" onClick={makeADatabass} />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}