import React, { useState, useEffect, createContext } from 'react'

const ModalContext = createContext()     //Contextオブジェクトを作成

const StateModal = () => {
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

    return (                             //App.jsxで囲った物(children)からはVluenに指定しているstate.user情報が扱える
        <AuthContext.Provider value={StateModal}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    ModalContext,                        //useContextでvalueのuserが使えるようになる
    AuthProvider                        //ページがuser情報を使えるように囲むためのプロバイダー（供給者）
}