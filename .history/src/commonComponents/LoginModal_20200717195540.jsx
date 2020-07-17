import React, { useState, useContext } from 'react'
import Modal from 'react-modal';
import firebase from '../config/firebase';
import { AuthContext } from '../store/AuthService';
import { Redirect } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import SigunUpModal from './SignUpModal';
Modal.setAppElement('#loginmodal')

//ログイン処理を行うモーダル
const LoginModal = ({ LoginModalIsOpen, closeLoginModal, history }) => {
    //仮メインページからstate([LoginModalIsOpen] 初期値はfalseで非表示になる）を受け取り、ログインするボタンクリックでtrueを渡される
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

    const customStyles = {                                                 //modalのスタイリングの書き方は以下
        overlay: {                                                         //クリックするとモーダルを閉じる部分（画面外灰色の部分）のスタイル
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(200, 200, 200, 0.75)',
        },
        content: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            //モーダルを真ん中に寄せる
            top: "17%",
            left: "30%",
            right: "30%",
            bottom: "17%",
            //モーダルを真ん中に寄せる

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
    const [password, setPassword] = useState('');
    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

    const openSignUpModal = () => {
        setSignUpModalIsOpen(true)
        console.log("サインアップ押したよ")
        //ログインモーダル閉じる
        render
        LoginModalIsOpen = false;
    }

    const closeSignUpModal = () => {
        setSignUpModalIsOpen(false)
    }

    const handlesubmit = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {

                history.push("/")                                          //成功したら/にリダイレクトして初回のページ遷移をする
                
            })
            .catch(err => {
                console.log(err)
            })

    }

    

    const user = useContext(AuthContext)

    if (user) {
        return <Redirect to="/" />                                         //ログイン状態ならLoggedMainPageに遷移
    }

    //////js////////js//////////js//////////js///
    return (
        <Modal
            isOpen={LoginModalIsOpen}
            onRequestClose={closeLoginModal}                   //mainDEMOのclassのthisを指定してcloseLoginModalを実行　LoginModalIsOpenがfalseになってモーダルが閉じられる
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div style={modalContainer}>
                <div style={modalText}>
                    <form onSubmit={handlesubmit}>
                        <h1>仮ログイン画面</h1>

                        <label htmlFor='email'>E-mail</label>
                        <br />
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                        />

                        <br />
                        <label htmlFor='password'>Password</label>
                        <br />
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='password'
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                        <br />
                        <button type="submit">ログイン</button>
                    </form>
                        <button onClick={openSignUpModal}>サインアップ</button>
                            <SigunUpModal/>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;