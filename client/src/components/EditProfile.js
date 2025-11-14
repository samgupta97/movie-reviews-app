import React, { useState } from 'react';
import axios from "axios"

function EditProfile() {
    const [firstName, setFirstName] = useState("Sameer");
    const [lastName, setLastName] = useState("Oberoi");
    const [email, setEmail] = useState("sa@gmail.com");
    const [mobile, setMobile] = useState("7417049145");
    const [dob, setDob] = useState("1990-10-10");

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",


        fontFamily: "Arial, sans-serif",
        padding: "1rem"
    };

    const cardStyle = {
        background: "#fff",
        padding: "2rem 2.5rem",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "462px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    };

    const titleStyle = {
        textAlign: "center",
        marginBottom: "1rem",
        color: "#343a40",
        fontSize: "1.5rem",
        fontWeight: "bold"
    };

    const inputStyle = {
        width: "100%",
        padding: "0.75rem 1rem",
        border: "1px solid #ced4da",
        borderRadius: "5px",
        fontSize: "1rem",
        outline: "none",
        transition: "0.2s",
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

    function changeskaro(e) {
        e.preventDefault();
        const formData = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "mobile": mobile,
            "birth": dob

        }

        const id = localStorage.getItem("user_id")
        axios.put(`http://localhost:4005/updateProfile/${id}`, formData)
            .then((resp) => {
                console.log("done with the changes")
            })
            .catch((error) => {

            })
    }

    return (
        <div style={containerStyle}>
            <form style={cardStyle} onSubmit={changeskaro}>
                <div style={titleStyle}>Edit Profile</div>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    style={inputStyle}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    style={inputStyle}
                    type="number"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                <input
                    style={inputStyle}
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
                <button type="submit" style={buttonStyle}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
