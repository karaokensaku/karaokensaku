import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDV3eMgYaAE76dwSJXpQyRdUMiBR8Ml5Us",
    authDomain: "karaokensaku.firebaseapp.com",
    databaseURL: "https://karaokensaku.firebaseio.com",
    projectId: "karaokensaku",
    storageBucket: "karaokensaku.appspot.com",
    messagingSenderId: "732854328014",
    appId: "1:732854328014:web:895e0012df732d5d3f0e9f",
}

firebase.initializeApp(firebaseConfig)

export const storage = firebase.storage();
export const fireStore = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;