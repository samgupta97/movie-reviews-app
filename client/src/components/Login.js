import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signinkaro(event) {
        event.preventDefault();
        const formData = { email, password };
        axios.post("http://localhost:4005/login/", formData)
            .then((resp) => {

                console.log(resp.data);
                localStorage.setItem("user_id", resp.data.data[0].id);
                navigate('/home/movies')

            })
            .catch(err => console.log(err));
    }

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        fontFamily: "Arial, sans-serif"
    };

    const cardStyle = {
        background: "#fff",
        padding: "2rem 2.5rem",
        borderRadius: "10px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
    };

    const titleStyle = {
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#343a40"
    };

    const inputStyle = {
        width: "100%",
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
        border: "1px solid #ced4da",
        borderRadius: "5px",
        fontSize: "1rem",
        outline: "none"
    };

    const buttonStyle = {
        width: "100%",
        padding: "0.75rem",
        background: "#007bff",
        border: "none",
        color: "white",
        fontSize: "1rem",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s"
    };

    const footerStyle = {
        marginTop: "1rem",
        textAlign: "center",
        fontSize: "0.9rem"
    };

    const linkStyle = {
        color: "#007bff",
        textDecoration: "none",
        marginLeft: "0.25rem"
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>Sign In</h2>
                <form onSubmit={signinkaro}>
                    <input style={inputStyle} type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input style={inputStyle} type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" style={buttonStyle}>Sign In</button>
                </form>
                <div style={footerStyle}>
                    <span>Don't have an account? </span>
                    <Link to='/' style={linkStyle}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
