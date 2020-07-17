import React ,{useState}from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';
import LoginModal from '../LoginModal'                          //ログイン用モーダル
import SignUpModal from '../SignUpModal'                        //サインアウト用モーダル


const MainDEMO = () =>  {                        //仮のユーザー用メインページ


    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [SignUpModalIsOpen, setSignUpModalIsOpen]
            // LoginModalIsOpen: false,                            //モーダルが開いているかの情報
            // SignUpModalIsOpen: false,                           //モーダルが開いているかの情報
        

    ///js//////js/////////js/////////js///////
                                                                //モーダルを開いたり閉じたりする関数達
    const openLoginModal() {
        this.setState({ LoginModalIsOpen: true });
        
    }

    const closeLoginModal() {
        this.setState({ LoginModalIsOpen: false });
    }
    
    openSignUpModal() {
        this.setState({ SignUpModalIsOpen: true });
        
    }

    closeSignUpModal() {
        this.setState({ SignUpModalIsOpen: false });
    }

    ///js//////js/////////js/////////js///////
    render() {
        //////////css//////////css/////////css//////
        const containerCSS = {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            border: "red 5px solid",
            margin: "10px 0",
            borderRadius: "10px",
            backgroundColor: "orange",
            height: "100vh",
            alignItems: "center",
            padding: "10px",
            color: "white",
        }
                                                                //containerのcss

        const mainPage = {
            display: "flex",
            justifyontent: "center",
            alignItems: "center",
            flexDirection: "column",

            borderRadius: "10px",
            border: "red 5px solid",
            backgroundColor: "white",
            color: "black",

            width: "49%",
            margin: "10px 20px",
            height: "100%",
            padding: "10px",
        }
                                                                //真ん中のメインページのcss
        /////////css/////////////css//////////css///////
        return (
            <>
                <Header />
                <div style={containerCSS} name="mainContainerGuest">
                    <RightSideBar />
                    <LeftSideBar />
                    <div style={mainPage}>

                        <button type="submit" onClick={this.openLoginModal.bind(this)}>ログインする</button>
                        <button type="submit" onClick={this.openSignUpModal.bind(this)}>会員登録する</button>
                        
                        {/* ログインモーダル用に開くか閉じるかの処理を渡す */}
                        <LoginModal LoginModalIsOpen={this.state.LoginModalIsOpen} closeLoginModal={this.closeLoginModal} THIS={this}/>　
                        {/* サインモーダル用に開くか閉じるかの処理を渡す */}
                        <SignUpModal SignUpModalIsOpen={this.state.SignUpModalIsOpen} closeSignUpModal={this.closeSignUpModal} THIS={this} />
                    </div>

                </div>
                <Footer />
            </>
        );
    }
}

export default MainDEMO;