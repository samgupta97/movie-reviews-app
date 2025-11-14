import { useEffect, useState } from "react";
import axios from "axios";

function SharedWithMe() {
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        axios.get(`http://localhost:4005/shared-with-me/${userId}`)
            .then(resp => setData(resp.data.data))
            .catch(err => console.log(err));
    }, []);

    // same styles as MyReviews
    const containerStyle = {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        fontFamily: "Arial, sans-serif"
    };

    const cardStyle = {
        background: "#fff",
        padding: "1rem 1.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
    };

    const titleStyle = {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "0.25rem"
    };

    const badgeStyle = {
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "4px",
        padding: "0.1rem 0.5rem",
        fontSize: "0.8rem",
        marginLeft: "0.5rem"
    };

    const updatedStyle = {
        fontSize: "0.8rem",
        color: "#888"
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: "1rem" }}>Shared With Me</h1>

            {data.length === 0 && <p>No shared reviews yet.</p>}

            {data.map((review) => (
                <div key={review.id} style={cardStyle}>
                    <div>
                        <span style={titleStyle}>{review.movie_title}</span>
                        <span style={badgeStyle}>{review.rating}/5</span>
                    </div>

                    <div>{review.review}</div>

                    <div style={updatedStyle}>
                        Shared review by: {review.first_name} {review.last_name}
                    </div>

                    <div style={updatedStyle}>
                        Last updated: {new Date(review.modified).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SharedWithMe;
