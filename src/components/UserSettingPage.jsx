import React, { useContext } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { AuthContext } from '../store/AuthService'
import firebase, { storage } from '../config/firebase'
//material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useState } from 'react';
//material UI

const MyPage = () => {
    const user = useContext(AuthContext);   //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    const containerCSS = {
        position: "relative",
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
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        left: "18%",
        backgroundColor: "#F2F2F2",
        color: "black",
        padding: "20px",
    }

    const settingContainer = {
        backgroundColor: "white",
        height: "70%",
        width: "80%",
        display: "flex",
    }

    const changeUserImg = {
        display: "flex",
        flexDirection: "column",
        justifyontent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        height: "100%",
        width: "40%",

    }

    const changeUerInformation = {
        display: "flex",
        flexDirection: "column",
        justifyontent: "center",
        alignItems: "center",
        backgroundColor: "gray",
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
    var name = user && user.displayName;
    var email = user && user.email;


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
    const [usersRef] = useState(firebase.firestore().collection('users'));

    const [changeImg, setChangeImg] = useState('');
    const [changeName, setChangeName] = useState(user && user.displayName);
    const [changeEmail, setChangeEmail] = useState(user && user.email);
    const [changePass, setChangePass] = useState('');
    // console.log(storage.ref("images").child(changeImg.name))


    console.log(user && user.email);


    const handlechangename = () => {
        console.log(changeName)
        //ここでメアド変更処理を書きたい
        // firebase.auth().updateCurrentUser()//???????
    }
    if (user) {
        return (
            <>
                <Header />
                <div style={containerCSS}>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
                        className={classes.modal}
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
                                <h2 id="transition-modal-title">アカウント画像</h2>

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
                                <input type="text" onChange={(e) => { setChangeName(e.target.value) }} />
                                <button onClick={handlechangename}>変更</button>
                                <img src={changeUserImg} />
                            </div>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
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
                                <h2 id="transition-modal-title">パスワード</h2>

                            </div>
                        </Fade>
                    </Modal>

                    <LeftSideBar />
                    <div style={mainPage}>
                        <h1>アカウント情報</h1>
                        <div style={settingContainer}>
                            <div style={changeUserImg}>
                                {/* <i className="fas fa-user-circle" style={{ fontSize: "15pc" }}></i> */}
                                <img src={changeUserImg} />
                                <button type="button" onClick={handleOpenImg}>
                                    アカウント画像を変更する
                                </button>


                            </div>

                            <div style={changeUerInformation}>
                                <form>
                                    <p>ユーザーネーム：　{name}</p>
                                    <button type="button" onClick={handleOpenName}>
                                        ユーザネームを変更する
                                    </button>


                                    <p>メールアドレス：　{email}</p>
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
                <Footer />
            </>
        );
    } else {
        // return <Redirect to={'/'} />   //ログイン状態でもメインページに飛ばされてしまう???????
        return (
            <>
                <Header />
                <p>ログインしてね</p>
            </>
        );
    }
}

export default MyPage