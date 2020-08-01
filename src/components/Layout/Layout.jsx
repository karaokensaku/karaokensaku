import React from "react"
import Header from "../Header"
import Footer from "../Footer"
import LeftSideBar from "../LeftSideBar"
import { StyledComponent } from "./Layout.styled"


const Layout = ({ children }) => {
  return (
    <StyledComponent>
      <Header />
      <LeftSideBar />
      <main className="main">{children}</main>
      <Footer />
    </StyledComponent>
  )
}


export default Layout
