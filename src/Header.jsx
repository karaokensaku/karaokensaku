import React from 'react';



const Header = () => {
/////////////////CSS//////////////////
    const headerTitle = {
        color: "blue",
        fontSize: "40px",
        margin: "0 0 0 10px",
        backgroundColor:"white",
        lineHeight:"40px",
        padding:"5px",
        borderRadius:"10px",
        border:"red 2px solid"
    }

    const headerCSS = {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "orange",
        alignItems: "center",
        padding: "5px",
        borderRadius: "20px",
        border: "red 5px solid",
        height: "52px",
    }

    const headerMenu = {
        display: "flex",
        listStyle: "none",
    }

    const headerMenuItem = {
        marginRight: "15px",
        color: "snow",
        textDecoration: "none",
    }
//////////////////↑CSS↑/////////////////////////

    return (
        <header style={headerCSS}>
            <form >
                <input type="search" placeholder="カラオケ動画を検索" />
                <button>検索</button>
            </form>
            <h1 style={headerTitle}>カラオ<span style={{ color: "red" }}>検索</span></h1>
            <nav>
                <ul style={headerMenu}>
                    <li><a style={headerMenuItem} href="#">HOT</a></li>
                    <li style={headerMenuItem}>NEW</li>
                    <li style={headerMenuItem}>LOGIN</li>
                </ul>
            </nav>
        </header>
    );

}
export default Header;