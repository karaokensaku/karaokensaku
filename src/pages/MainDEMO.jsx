import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';
import LoginModal from '../LoginModal'
import Modal from 'react-modal';


Modal.setAppElement('#loginmodal')

class MainDEMO extends React.Component {//仮のメインページ
    constructor(props) {
        super(props);

        this.state = {
            IsOpenModal: false,//モーダルが開いているかの情報

        }
    }
    ///js//////js/////////js/////////js///////
    openModal() {
        this.setState({ modalIsOpen: true });
        
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
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
                <div style={containerCSS} name="mainContainer">
                    <RightSideBar />
                    <LeftSideBar />
                    <div style={mainPage}>

                        <button type="submit" onClick={this.openModal.bind(this)}>ログインする</button>
                        <LoginModal modalIsOpen={ this.state.modalIsOpen } closeModal={this.closeModal} THIS={this}/>
                        
                    </div>

                </div>
                <Footer />
            </>
        );
    }
}

export default MainDEMO;