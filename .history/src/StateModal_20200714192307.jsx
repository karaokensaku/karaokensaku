import React, { useState, useEffect, createContext } from 'react'

const ModalContext = createContext()     //Contextオブジェクトを作成

const StateModal = ({children}) => {
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
    
    return (                             //App.jsxで囲った物(children)からはVluenに指定しているstate.user情報が扱える
        <ModalContext.Provider value={LoginModalIsOpen,SignUpModalIsOpen}>
            {children}
        </ModalContext.Provider>
    );
}

export {
    ModalContext,                        //useContextでvalueのuserが使えるようになる
    StateModal                        //ページがuser情報を使えるように囲むためのプロバイダー（供給者）
}