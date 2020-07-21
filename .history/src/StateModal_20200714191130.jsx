import React, { useState, useEffect, createContext } from 'react'

const AuthContext = createContext()     //Contextオブジェクトを作成

const StateModal = () => {
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

    return (                             //App.jsxで囲った物(children)からはVluenに指定しているstate.user情報が扱える
        <AuthContext.Provider value={StateModal}>
            {children}
        </AuthContext.Provider>
    );
}