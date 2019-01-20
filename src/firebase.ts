import '@firebase/firestore';

import firebase from '@firebase/app';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const projId = publicRuntimeConfig.FIREBASE_PROJECT_ID;

try {
  firebase.initializeApp({
    apiKey: publicRuntimeConfig.FIREBASE_API_KEY,
    authDomain: `${projId}.firebaseapp.com`,
    databaseURL: `${projId}.firebaseio.com`,
    messagingSenderId: publicRuntimeConfig.FIREBASE_MESSAGING_ID,
    projectId: projId,
    storageBucket: `${projId}.appspot.com`,
  });
} catch (_e) {}

export const db = firebase.firestore!();
db.settings({ timestampsInSnapshots: true });

if (!('exit' in process)) {
  window.db = db;
}
