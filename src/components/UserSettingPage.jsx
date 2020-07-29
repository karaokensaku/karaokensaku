import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftSideBar from './LeftSideBar';
import { AuthContext } from '../store/AuthService'
import firebase, { storage } from '../config/firebase'
//material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useState } from 'react';
import { useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import AvatarEditor from '../commonComponents/AvatarEditor'
// import AvatarEditor from 'react-avatar-editor';
//material UI

const MyPage = () => {
    const user = useContext(AuthContext);   //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    const containerCSS = {
        // position: "relative",
        backgroundColor: "orange",
        minHeight: "100vh",
        alignItems: "center",
        color: "white",
    }
    //containerのcss

    const mainPage = {
        display: "flex",
        justifyontent: "center",
        alignItems: "center",
        flexDirection: "column",
        // position: "absolute",
        // right: 0,
        // top: 0,
        // bottom: 0,
        // left: "18%",
        backgroundColor: "#F2F2F2",
        color: "black",
        padding: "20px",
    }

    const settingContainer = {
        backgroundColor: "white",
        // height: "350px",
        // width: "63%",
        display: "flex",
        borderTop: "40px solid rgb(197, 13, 26)",
        borderLeft: "5px solid rgb(197, 13, 26)",
        borderRight: "5px solid rgb(197, 13, 26)",
        borderBottom: "5px solid rgb(197, 13, 26)",
        borderRadius: "10px"
    }

    const changeUserImg = {
        display: "flex",
        flexDirection: "column",
        justifyontent: "center",
        alignItems: "center",
        // backgroundColor: "blue",
        height: "100%",
        width: "40%",

    }

    const changeUerInformation = {
        display: "flex",
        flexDirection: "column",
        justifyontent: "center",
        alignItems: "center",
        // backgroundColor: "gray",
        height: "100%",
        width: "60%",
    }
    // console.log(user && user)
    //モーダルスタイル
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();

    //////////////モーダル関連
    const [openUserImgModal, setOpenUserImgModal] = React.useState(false);
    const [openNameModal, setOpenNameModal] = React.useState(false);
    const [openEmailModal, setOpenEmailModal] = React.useState(false);
    const [openPassModal, setOpenPassModal] = React.useState(false);
    // var name = user && user.displayName;
    // var email = user && user.email;

    const handleOpenImg = () => {
        setOpenUserImgModal(true);
    };
    const handleOpenName = () => {
        setOpenNameModal(true);
    };
    const handleOpenEmail = () => {
        setOpenEmailModal(true);
    };
    const handleOpenPass = () => {
        setOpenPassModal(true);
    };
    const handleClose = () => {
        setOpenNameModal(false);
        setOpenEmailModal(false);
        setOpenPassModal(false);
        setOpenUserImgModal(false);
    };

    /////////////モーダル関連
    // const [usersRef] = useState(firebase.firestore().collection('users'));

    const [changeImg, setChangeImg] = useState('');
    const [changeName, setChangeName] = useState(user && user.displayName);
    const [changeEmail, setChangeEmail] = useState(user && user.email);
    const [changePass, setChangePass] = useState('');

    const handlechangename = () => {
        user.updateProfile({
            displayName: changeName,
        })
        handleClose()
    }

    const handleChangeEmail = (e) => {
        e.preventDefault()
        user.updateEmail(changeEmail).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
        handleClose()
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    const handleImage = event => {
        const image = event.target.files[0];
        setChangeImg(image);
    };

    const handlechangeImg = (e) => {
        e.preventDefault();
        if (changeImg === "") {
            console.log("ファイルが選択されていません");
        } else {

            // アップロード処理
            const uploadTask = storage.ref(`/images/${changeImg.name}`).put(changeImg);
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                next,
                error,
                complete
            );
        }
    }
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
            .child(changeImg.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
                user.updateProfile({
                    photoURL: fireBaseUrl,
                })
            });

    };

    const handleChangePass = (e) => {
        e.preventDefault()
        user.updatePassword(changePass).then(function () {
            // Update successful.
            console.log(changePass);
        }).catch(function (error) {
            // An error happened.
        });
    }



    if (user) {
        return (
            <>
                <div style={containerCSS}>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
                        // className={classes.modal}
                        open={openUserImgModal}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openUserImgModal}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">アカウント画像の変更</h2>
                                <form onSubmit={handlechangeImg}>
                                    <div>
                                        <h1>画像アップロード</h1>

                                        <input type="file" accept="image/*" onChange={handleImage} />
                                        <button type="submit">変更</button>

                                    </div>
                                </form>
                            </div>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openNameModal}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openNameModal}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">ユーザーネーム</h2>
                                <p>新しいユーザーネームを入力してください</p>

                                <form onSubmit={handlechangename}>

                                    <label htmlFor='username'>UserName</label>
                                    <input
                                        name='username'
                                        type='username'
                                        id='username'
                                        placeholder='username'
                                        onChange={e => {
                                            setChangeName(e.target.value)
                                        }}
                                    />
                                    <button type="submit">変更</button>
                                </form>
                            </div>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        className={classes.modal}
                        open={openEmailModal}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openEmailModal}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">メールアドレス</h2>
                                <form onSubmit={handleChangeEmail}>

                                    <label htmlFor='email'>E-mail</label>
                                    <input
                                        name='email'
                                        type='email'
                                        id='email'
                                        placeholder='Email'
                                        onChange={e => {
                                            setChangeEmail(e.target.value)
                                        }}
                                    />
                                    <button type="submit">変更</button>
                                </form>
                            </div>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openPassModal}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openPassModal}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">パスワードの変更</h2>
                                <form onSubmit={handleChangePass}>
                                    <label htmlFor='password'>Password</label>
                                    <input
                                        name='password'
                                        type='password'
                                        id='password'
                                        placeholder='Password'
                                        onChange={e => {
                                            setChangePass(e.target.value)
                                        }}
                                    />
                                    <button type="submit">変更</button>
                                </form>
                            </div>
                        </Fade>
                    </Modal>

                    <div style={mainPage}>
                        <h1>アカウント情報</h1>
                        <div style={settingContainer}>
                            <div style={changeUserImg}>

                                <div style={{ borderRadius: "200px", backgroundColor: "#F2F2F2", height: "200px", width: "200px", overflow: "hidden", margin: "20px" }}>
                                    <img src={user.photoURL} height="100%" width="100%" alt="userImg" />
                                </div>
                                
                                
                                {/* <AvatarEditor /> */}
                                <button type="button" onClick={handleOpenImg}>
                                    アカウント画像を変更する
                                </button>


                            </div>

                            <div style={changeUerInformation}>
                                <form>
                                    <p>ユーザーネーム：　{user.displayName}</p>
                                    <button type="button" onClick={handleOpenName}>
                                        ユーザネームを変更する
                                    </button>


                                    <p>メールアドレス：　{user.email}</p>
                                    <button type="button" onClick={handleOpenEmail}>
                                        メールアドレスを変更する
                                    </button>


                                    <p>パスワード：　******</p>
                                    <button type="button" onClick={handleOpenPass}>
                                        パスワードを変更する
                                    </button>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        // return <Redirect to={'/'} />   //ログイン状態でもメインページに飛ばされてしまう??????
            return (
                <>
                    <p>ログインしてね♡</p>
                </>
            );
    }
}

export default MyPage