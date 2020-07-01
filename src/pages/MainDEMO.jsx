import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';
import LoginModal from '../LoginModal'
import { render } from '@testing-library/react';

class MainDEMO extends React.Component {//仮のメインページ
    constructor(props) {
        super(props);

        this.state = {
           IsOpenModal :false,//モーダルが開いているかの情報
           
        }
        
        ///js//////js/////////js/////////js///////

        ///js//////js/////////js/////////js///////
    }
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
                        <form >
                            <button type="submit">ログインする</button>
                        </form>

                    </div>

                </div>
                <Footer />
            </>
        );
    }
}

export default MainDEMO;