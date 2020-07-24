import React from 'react';

const Footer = () => {

    const FoterCSS = {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#C50D1A",
        alignItems: "center",
        padding: "5px",
        height: "30px",
        color: "white",
        width: "100%",
    }

    return (
        <footer style={FoterCSS}>
            <small>KARAOKENSAKU</small>
        </footer>
    );
}

export default Footer;