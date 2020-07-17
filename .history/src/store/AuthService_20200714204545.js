// AuthService.js
import React, { useState, useEffect, createContext } from 'react'
import firebase from '../'

const AuthContext = createContext()     //Contextオブジェクトを作成

const AuthProvider = ({children}) => {  //childrenにして全てのコンポーネントを囲うことでuser情報を全てのページに使えるようにする

    const [user, setUser] = useState(null)

    useEffect(() => {                   //外部(APIなど)との通信や、DOMの直接的な更新等、関数の外のスコープに影響を与えるような処理はuseEffectを使って記述する
                                        // ↓ログイン時に引数のuserにユーザーに関するオブジェクトが渡される
        firebase.auth().onAuthStateChanged(user => {
            setUser(user)               //引数として渡されたuserから、stateの「setUser」で更新
        })
    }, [])                              //空の配列を与えた場合には、初回描写時にのみ実行されます。

    return(                             //App.jsxで囲った物(children)からはVluenに指定しているstate.user情報が扱える
        <AuthContext.Provider value={user}> 
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,                        //useContextでvalueのuserが使えるようになる
    AuthProvider                        //ページがuser情報を使えるように囲むためのプロバイダー（供給者）
}