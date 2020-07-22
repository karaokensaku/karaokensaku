import React, { useContext } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { AuthContext } from '../store/AuthService';

import React, { useState } from "react";
import _ from "lodash";
// import { Link } from 'react-router-dom';

const MainPage = () => {                        //仮のユーザー用メインページ
    const user = useContext(AuthContext);
    //////////css//////////css/////////css//////
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
        top:0,
        bottom:0,
        left:"18%",
        backgroundColor: "#F2F2F2",
        color: "black",
        padding: "20px",
    }
    //真ん中のメインページのcss
   
    /////////css/////////////css//////////css///////
    if (user) {
        return (
            <>
                <Header />
                <div style={containerCSS} name="mainContainer">
                    <LeftSideBar />
                    <div style={mainPage}>
                    aaa
                    </div>
                </div>
                <Footer />
            </>
        );
    } else {
        console.log("aaaaa")
        return (
            <>
                <Header />
                <div style={containerCSS} name="mainContainerGuest">
                    <LeftSideBar />
                    <div style={mainPage}>
                        aaaa
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default MainPage;
import React, {useState} from "react";
import _ from "lodash";
import Header from "../commonComponents/Header";
import LeftSideBar from "../commonComponents/LeftSideBar";
import RightSideBar from "../commonComponents/RightSideBar";

const Youtube = ({ onSearchYoutube, videos }) => {
  console.log(videos)
  const [keyword, setKeyword] = useState("");

  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
    // _debounce(e.target.value)
  };

  const handleClickInput = (e) => {
    _debounce(keyword);
    // setState({ keyword: e.target.value });
  };

  const _debounce = _.debounce((value) => {
    onSearchYoutube(value + "カラオケ");
  }, 200);

  const video = videos.map((video) => {
    const url = "https://www.youtube.com/embed/" + video.id.videoId;

    return (
      <>
        <div style={{ margin: "20px", textAlign: "center" }}>
          <iframe
            id="ytplayer"
            type="ytplayer"
            width="480"
            height="270"
            src={url}
            frameborder="0"
          />
        </div>
      </>
    );
  });

  return (
    <div style={{ marginTop: "10px" }}>
      <Header />
      <LeftSideBar />
      <RightSideBar/>
      <input
        type="search"
        name="search"
        placeholder="キーワードを入力"
        onChange={handleChangeInput}
        value={keyword}
      />
      <button onClick={handleClickInput}>検索</button>
      <h1>{keyword}</h1>
      <p>の検索結果</p>
      {video}
    </div>
  );
};

export default Youtube;
