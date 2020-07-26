import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../store/AuthService';
import firebase, { fireStore } from '../../config/firebase';
import { Link } from 'react-router-dom';
import SignUpModal from '../SignUpModal';
import LoginModal from '../LoginModal'                          //ログイン用モーダル
import { StyledComponent } from "./Header.styled"
import { useRecoilState } from 'recoil';
import { myPageState } from '../../atoms/myPage';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Header = () => {

  /////////////////CSS//////////////////
  // const headerTitle = {
  //   color: "white",
  //   fontSize: "40px",
  //   left: "10px",
  //   marginLeft: "100px",
  // }

  // const headerCSS = {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   backgroundColor: "white",
  //   alignItems: "center",
  // }

  // const titlelinkCSS = {
  //   width: "225px",
  //   margin: "auto",
  //   textDecoration: 'inherit',
  // }

  // const leftdiv = {
  //   backgroundColor: "#C50D1A",
  //   position: "relative",
  //   width: "70%"
  // }

  // const rightdiv = {
  //   backgroundColor: "white",
  //   width: "30%",
  //   position: "relative",
  //   height: "113.5px",
  //   display: "flex",
  //   alignItems: "flex-end",
  //   justifyContent: "space-around"
  // }
  //////////////////CSS/////////////////

  /////js///////js////////////js////////
  // const user = useContext(AuthContext);                    //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

  //グローバルで管理できるのかな？↓
  // const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
  // const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  // // const [myPages, setMyPages] = useRecoilState(myPageState);

  // useEffect(() => {
  //   let getMypages = [];
  //   firebase.auth().onAuthStateChanged((user) => {
  //     const uid = user.uid;
  //     fireStore.collection('user').doc(`${uid}`).collection('myPages').get().then((snapshot) => {
  //       snapshot.forEach(myPage => {
  //         getMypages.push({
  //           id: myPage.id,
  //           ...myPage.data()
  //         });
  //       });
  //     }).then(() => {
  //       setMyPages(getMypages);
  //     });
  //   });
  // }, [user]);

  // const LogOut = (user) => {                          //ログアウト処理
  //   firebase.auth().onAuthStateChanged((user) => {
  //     firebase.auth().signOut().then(() => {
  //       console.log("ログアウトしました");
  //       setLoginModalIsOpen(false);
  //     })
  //       .catch((error) => {
  //         console.log(`ログアウト時にエラーが発生しました (${error})`);
  //       });
  //   });
  // }
  // ///js//////js/////////js/////////js///////
  // //モーダルを開いたり閉じたりする関数達
  // const openLoginModal = () => {
  //   setLoginModalIsOpen(true)
  // }

  // const closeLoginModal = () => {
  //   setLoginModalIsOpen(false)
  // }

  // const openSignUpModal = () => {
  //   setSignUpModalIsOpen(true)
  // }

  // const closeSignUpModal = () => {
  //   setSignUpModalIsOpen(false)
  // }

  //モーダルを開いたり閉じたりする関数達
  // const RenderHeader = (user) => {

  //   if (user) {
  //     // ログイン時
  //     return (
  //       <StyledComponent className="header">
  //         <div className="title">
  //           <Link to="/"><h1>カラオ検索</h1></Link>
  //         </div>
  //         <div className="headerMenu">
  //           <Link to="/UserSettingPage" >
  //               <img src={user.photoURL} height="100%" width="100%" alt="userImg" />
  //             <h3>User Setting</h3>
  //           </Link>
  //           <Button  variant="contained" onClick={LogOut}>ログアウト</Button>
  //         </div>
  //       </StyledComponent>
  //     )
  //   } else {
  //     // 非ログイン時
  //     return (
  //       <StyledComponent className="header">
  //         <div className="title">
  //           <Link to="/"><h1>カラオ検索</h1></Link>
  //         </div>
  //         <div className="headerMenu">
  //           <Button variant="contained" onClick={openSignUpModal}>サインアップ</Button>
  //           <Button variant="contained" onClick={openLoginModal}>ログイン</Button>
  //         </div>

  //         {/* ログインモーダル用に開くか閉じるかの処理を渡す */}
  //         <LoginModal
  //         LoginModalIsOpen={LoginModalIsOpen}
  //         closeLoginModal={closeLoginModal}
  //         />
  //         <SignUpModal
  //         SignUpModalIsOpen={SignUpModalIsOpen}
  //         closeSignUpModal={closeSignUpModal}
  //         />
  //       </StyledComponent>
  //     );
  //   }
  // }
  // /////js///////js////////////js////////
  // return (
  //   <>
  //     {RenderHeader(user)}
  //   </>
  // );

}
export default Header;
