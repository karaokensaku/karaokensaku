import React, { useContext } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { AuthContext } from '../store/AuthService'



import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
    console.log(user)

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

    const [openUserImgModal, setOpenUserImgModal] = React.useState(false);
    const [openNameModal, setOpenNameModal] = React.useState(false);
    const [openEmailModal, setOpenEmailModal] = React.useState(false);
    const [openPassModal, setOpenPassModal] = React.useState(false);

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

    if (user) {
        return (
            <>
                <Header />
                <div style={containerCSS}>
                    <LeftSideBar />
                    <div style={mainPage}>
                        <h1>アカウント情報</h1>
                        <div style={settingContainer}>
                            <div style={changeUserImg}>
                                <i className="fas fa-user-circle" style={{ fontSize: "15pc" }}></i>
                                <button type="button" onClick={handleOpenImg}>
                                    アカウント画像を変更する
                                </button>
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

                            </div>

                            <div style={changeUerInformation}>
                                <form>
                                    <p>ユーザーネーム：　あああああ</p>
                                    <button type="button" onClick={handleOpenName}>
                                        ユーザネームを変更する
                                    </button>
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

                                            </div>
                                        </Fade>
                                    </Modal>

                                    <p>メールアドレス: aaa@aaa.jp</p>
                                    <button type="button" onClick={handleOpenEmail}>
                                        メールアドレスを変更する
                                    </button>
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
                                    
                                    <p>パスワード：　******</p>
                                    <button type="button" onClick={handleOpenPass}>
                                        パスワードを変更する
                                    </button>
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