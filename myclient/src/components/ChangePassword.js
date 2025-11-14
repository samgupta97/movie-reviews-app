import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontFamily: "Arial, sans-serif"
    };

    const cardStyle = {
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    };

    const titleStyle = {
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "bold"
    };

    const inputStyle = {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #ccc",
        borderRadius: "5px"
    };

    const buttonStyle = {
        width: "100%",
        padding: "0.75rem",
        background: "#007bff",
        border: "none",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer"
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) return;

        const userId = localStorage.getItem("user_id");

        axios.put(`http://localhost:4005/changePassword/${userId}`, {
            oldPassword,
            newPassword
        });

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div style={containerStyle}>
            <form style={cardStyle} onSubmit={handleSubmit}>
                <div style={titleStyle}>Change Password</div>
                <input
                    style={inputStyle}
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                <input
                    style={inputStyle}
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    style={inputStyle}
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" style={buttonStyle}>Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
