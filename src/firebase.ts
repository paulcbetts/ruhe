import '@firebase/firestore';

import firebase from '@firebase/app';

const projId = process.env.VUE_APP_FIREBASE_PROJECT_ID;

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: `${projId}.firebaseapp.com`,
  databaseURL: `${projId}.firebaseio.com`,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_ID,
  projectId: projId,
  storageBucket: `${projId}.appspot.com`,
});

export const db = firebase.firestore!();
db.settings({ timestampsInSnapshots: true });
