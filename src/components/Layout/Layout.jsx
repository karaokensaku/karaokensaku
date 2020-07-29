import React from "react"
import Header from "../Header"
import Footer from "../Footer"
import LeftSideBar from "../LeftSideBar"
// import "../../styles/reset.css"
// import { GlobalStyle } from "../../styles/GlobalStyle"
import { StyledComponent } from "./Layout.styled"


const Layout = ({ children }) => {
  return (
    <StyledComponent>
      {/* <GlobalStyle /> */}
      <Header />
      <LeftSideBar />
      <main className="main">{children}</main>
      <Footer />
    </StyledComponent>
  )
}


export default Layout
