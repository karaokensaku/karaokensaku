import React from 'react';
import ReactDOM from 'react-dom';

//ログイン処理を行うモーダル
const LoginModal = props => {    
////////css///////////css///////////css///////
    const modalContainer = {
        backgroundColor: "blue",
        height: "460px",
        width: "500px",
        display:"flex",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
    }
    
    const modalText = {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        
        height: "360px",
        width: "400px",
    }
////////css///////////css///////////css///////
    return ReactDOM.createPortal(
        <div style={modalContainer}>
            <div style={modalText}>
                <form>
                    <h1>仮ログイン画面</h1>
                    <p>メールアドレス</p>
                    <input type="email"/>
                    <p>パスワード</p>
                    <input type="password"/>
                    <br/>
                    <button>ログイン</button>
                </form>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default LoginModal;