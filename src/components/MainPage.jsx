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
