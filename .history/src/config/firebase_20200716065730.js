import * as firebase from 'firebase/app';
//必ず一番上に置いておくインポート
import 'firebase/auth';
//Firebase Authenticationを使用するためインポート


const firebaseConfig = {
    // 各人の認証情報を記述
    apiKey: "AIzaSyDV3eMgYaAE76dwSJXpQyRdUMiBR8Ml5Us",
    authDomain: "karaokensaku.firebaseapp.com",
    databaseURL: "https://karaokensaku.firebaseio.com",
    projectId: "karaokensaku",
    storageBucket: "karaokensaku.appspot.com",
    messagingSenderId: "732854328014",
    appId: "1:732854328014:web:895e0012df732d5d3f0e9f"
}

firebase.initializeApp(firebaseConfig)
//firebaseAppの初期化

export default firebase;