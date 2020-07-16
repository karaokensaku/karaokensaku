import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase,{ storage } from '../config/firebase';

Modal.setAppElement('#loginmodal')

const SigunUpModal = ({ SignUpModalIsOpen, closeSignUpModal, }) => {

    ////////css///////////css///////////css///////
    const modalContainer = {
        backgroundColor: "red",
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
            display: "flex",
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
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const handleImage = e => {
        e.preventDefault();
        if(image === "" ){
            console.log("ファイルが選択されていません");
        }
        //アップロード処理
        const uploadTask
    }
    const handlesubmit = e => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(err => {console.log(err)}) //サインアップの処理
        
    }
    //////js////////js//////////js//////////js///
    return (
        <Modal
            isOpen={SignUpModalIsOpen}                      //trueなら表示
            onRequestClose={closeSignUpModal}    //mainDEMOのclassのthisを指定してcloseSignUpModalを実行　SignUpModalIsOpenがfalseになってモーダルが閉じられる
            style={customStyles}
            contentLabel="SignUp Modal"
        >
            <div style={modalContainer}>
                <div style={modalText}>
                    <form onSubmit={handlesubmit}>
                        <h1>仮サインアップ画面</h1>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            name='email'
                            type='email'
                            id='email'
                            placeholder='Email'
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                        /><br/>
                        <label htmlFor='password'>Password</label>
                        <input
                            name='password'
                            type='password'
                            id='password'
                            placeholder='Password'
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                        <div className="App">
                            <h1>画像アップロード</h1>
                            <form onSubmit={onSubmit}>
                                <input type="file" onChange={handleImage} />
                                <button>Upload</button>
                            </form>
                            <img src={imageUrl} alt="uploaded" />
                        </div>
                        <br />
                        <button type="submit">登録</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default SigunUpModal;