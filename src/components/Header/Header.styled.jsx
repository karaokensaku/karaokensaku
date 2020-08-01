import styled from "styled-components";

const mq = "@media (max-width:600px)";

export const StyledComponent = styled.header`
    display: flex;
    justify-content:space-between;
    .title {
      display: flex;
      justify-content:flex-start;
      flex: 1;
      background-color:#C50D1A;
      a {
        display: flex;
        align-items:center;
        color: white;
        font-size: 20px;
        text-decoration: inherit;
        padding:0 60px;
      ${mq}{
          font-size:14px;
        }
      }
    }
    .headerMenu {
      display: flex;
      justify-content:center;
      align-items:center;
      a {
        display: flex;
        justify-content:flex-start;
        align-items:center;
        flex-direction:column;
        .avatarImg {
          width:100px;
          height:100px;
          margin:20px;
        }
        h3 {
          font-size:16px;
          margin:0;
        }
      }
      button {
        background-color: #C50D1A;
        color: white;
        height: 40px;
        margin: 10px;
      }
      ${mq}{
        img {
          width:50px;
          height:50px;
          margin:2px;
        }
        button {
          background-color: #C50D1A;
          color: white;
          width:100%;
          height: 100%;
          margin: 0;
          border-radius:0;
          outline: 0.1px solid #aaa;
          font-size:12px;
          box-shadow:0 0 0 0;
      }
        }
    }
  `;