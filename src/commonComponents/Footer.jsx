import React from 'react';

const Footer = () => {

    const FoterCSS = {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#C50D1A",
        alignItems: "center",
        padding: "5px",
        // borderRadius: "20px",
        // border: "red 5px solid",
        height: "30px",
        color: "white",
    }

    return (
        <foter style={FoterCSS}>
            <small>KARAOKENSAKU</small>
        </foter>
    );
}

export default Footer;