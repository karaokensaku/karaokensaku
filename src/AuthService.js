// AuthService.js
import React, { useState, useEffect, createContext } from 'react'
import firebase from './config/firebase'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {   //外部(APIなど)との通信や、DOMの直接的な更新等、関数の外のスコープに影響を与えるような処理はuseEffectを使って記述する
        firebase.auth().onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    return(
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,
    AuthProvider
}