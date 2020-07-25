import styled from "styled-components";

export const StyledComponent = styled.header`
    display: flex;
    justify-content:space-between;
    padding:20px;
    background-color:#eee;
    border: 3px solid #C50D1A;
    border-radius:10px;
    .title {
      display: flex;
      margin-left:80px;
      a {
        display: flex;
        align-items:center;
        color: white;
        font-size: 32px;
        background-color:#C50D1A;
        text-decoration: inherit;
        padding:0 60px;
      }
    }
    .headerMenu {
      display: flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      margin-right:80px;
      border:1.5px solid #666;
      border-radius:5px;
      a {
        display: flex;
        justify-content:flex-start;
        align-items:center;
        flex-direction:column;
        img {
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
      
    }
  `;