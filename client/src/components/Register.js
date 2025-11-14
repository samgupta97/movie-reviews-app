import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("Sameer");
    const [lastName, setLastName] = useState("Oberoi");
    const [email, setEmail] = useState("sa@gmail.com");
    const [mobile, setMobile] = useState("7417049145");
    const [dob, setDob] = useState("1990-10-10");
    const [password, setPassword] = useState("sa@gmail.com");

    function registerkaro(event) {
        event.preventDefault();
        const formData = {
            first_name: firstName,
            last_name: lastName,
            email,
            mobile,
            birth: dob,
            password
        };

        axios.post("http://localhost:4005/register/", formData)
            .then(() => navigate("/login"))
            .catch(err => console.log(err));
    }

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f8f9fa",
        fontFamily: "Arial, sans-serif"
    };

    const cardStyle = {
        background: "#fff",
        padding: "2rem 2.5rem",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "462px"
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

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>Sign Up</h2>
                <form onSubmit={registerkaro}>
                    <input style={inputStyle} type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input style={inputStyle} type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input style={inputStyle} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input style={inputStyle} type="number" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    <input style={inputStyle} type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                    <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input style={inputStyle} type="password" placeholder="Confirm Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
