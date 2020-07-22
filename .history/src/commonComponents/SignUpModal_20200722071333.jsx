<<<<<<< HEAD
import React, { useState ,useContext } from 'react';
import Modal from 'react-modal';
import firebase, { storage } from '../config/firebase';
import { AuthContext } from '../store/AuthService'
Modal.setAppElement('#loginmodal')

const SigunUpModal = ({ SignUpModalIsOpen, closeSignUpModal, }) => {
    const user = useContext(AuthContext);   //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る
=======
import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from '../config/firebase';

Modal.setAppElement('#loginmodal')

const SigunUpModal = ({ SignUpModalIsOpen, closeSignUpModal, }) => {

>>>>>>> origin/feature/youtube
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
    const [imageUrl, setImageUrl] = useState('');
    const [userName, setUserName] = useState('')

    const handleImage = event => {
        const image = event.target.files[0];
        setImage(image);
    };
    const onSubmit = event => {
        event.preventDefault();
        if (image === "") {
            console.log("ファイルが選択されていません");
        }
        // アップロード処理
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            next,
            error,
            complete
        );
    };
    const next = snapshot => {
        // 進行中のsnapshotを得る
        // アップロードの進行度を表示
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
        console.log(snapshot);
        
    };
    const error = error => {
        // エラーハンドリング
        console.log(error);
        
    };
    
    const complete = () => {
        // 完了後の処理
        // 画像表示のため、アップロードした画像のURLを取得
        storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
                // setImageUrl(fireBaseUrl);

                user.updateProfile({
                    photoURL: "fireBaseUrl"
                }).then(function () {
                    // Update successful.
                    console.log(fireBaseUrl)
                }).catch(function (error) {
                    // An error happened.
                    console.log("失敗")
                });
                
            });

            
    };
    
    const handlesubmit = e => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(({ user }) => {
                var currentUser = firebase.auth().currentUser;
                currentUser.updateProfile({
                    displayName: userName
                })
                console.log(user)
            })

        .catch(err => {console.log(err)}) //サインアップの処理
        
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

                        <label htmlFor='username'>UserName</label>
                        <input
                            name='username'
                            type='username'
                            id='username'
                            placeholder='username'
                            onChange={e => {
                                setUserName(e.target.value)
                            }}
                        /><br />

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
<<<<<<< HEAD

=======
>>>>>>> origin/feature/youtube
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
<<<<<<< HEAD
                        <div className="App">
                            <h1>画像アップロード</h1>
                            <form onSubmit={onSubmit}>
                                <input type="file" onChange={handleImage} />
                                
                                <button type="submit">登録</button>
                            </form>
                            <img src={imageUrl} alt="uploaded" />
                        </div>
                        <br />
=======
                        <br />
                        <button type="submit">登録</button>
>>>>>>> origin/feature/youtube
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default SigunUpModal;