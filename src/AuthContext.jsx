import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState('');
    //ユーザー情報のstate

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            //ログイン状態を監視してuserにログイン情報を格納。ログアウト時はnullになる
        })
    },[])
}

