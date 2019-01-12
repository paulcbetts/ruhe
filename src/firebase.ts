import '@firebase/firestore';

import firebase from '@firebase/app';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const projId = publicRuntimeConfig.FIREBASE_PROJECT_ID;

firebase.initializeApp({
  apiKey: publicRuntimeConfig.FIREBASE_API_KEY,
  authDomain: `${projId}.firebaseapp.com`,
  databaseURL: `${projId}.firebaseio.com`,
  messagingSenderId: publicRuntimeConfig.FIREBASE_MESSAGING_ID,
  projectId: projId,
  storageBucket: `${projId}.appspot.com`,
});

export const db = firebase.firestore!();
db.settings({ timestampsInSnapshots: true });
