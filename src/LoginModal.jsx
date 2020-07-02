import React, { useState, useContext } from 'react'
import Modal from 'react-modal';
import firebase from './config/firebase';
import { AuthContext } from './AuthService';
import { Redirect } from 'react-router-dom';

Modal.setAppElement('#loginmodal')

//ログイン処理を行うモーダル
const LoginModal = ({LoginModalIsOpen, closeLoginModal, THIS, history}) => {
    //仮メインページからstateを渡すLoginModalIsOpen（初期値はfalseで非表示になる）を受け取り、ログインするボタンクリックでtrueを渡される
    //closeLoginModalでIsmodalOpenをfalseにする関数を受け取る。
    //MainDemoコンポーネントクラスコンポーネントのthisを受け取るため名前をthisと区別するため大文字にする


    ////////css///////////css///////////css///////
    const modalContainer = {
        backgroundColor: "blue",
        height: "460px",
        width: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const modalText = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",

        height: "360px",
        width: "400px",
    }

    const customStyles = {//modalのスタイル
        overlay: {//クリックするとモーダルを閉じる部分（画面外）のスタイル
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(200, 200, 200, 0.75)',
        },
        content: {
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
    
            //真ん中に寄せる
            top: "17%",
            left: "30%",
            right: "30%",
            bottom: "17%",
            //真ん中に寄せる

            position: 'absolute',
            border: '1px solid #ccc',
            background: 'gray',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
        },
    }
    ////////css///////////css///////////css///////
    //////js////////js//////////js//////////js///
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handlesubmit = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(() =>{ 
            history.push("/")
        })
        .catch(err => {
            console.log(err)
        })

    }

    const user = useContext(AuthContext)

    if (user) {
        return <Redirect to="/" />
    }
    //////js////////js//////////js//////////js///
    return (
        <Modal
            isOpen={LoginModalIsOpen}
            onRequestClose={closeLoginModal.bind(THIS)}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div style={modalContainer}>
                <div style={modalText}>
                    <form onChange={handlesubmit}>
                        <h1>仮ログイン画面</h1>
                        <p>メールアドレス</p>
                        <input
                            type="email"
                            onChange={e => { setEmail(e.target.value) }}
                        />
                        <p>パスワード</p>
                        <input
                            type="password"
                            onChange={e => { setPassword(e.target.value) }}
                        />
                        <br />
                        <button>ログイン</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;