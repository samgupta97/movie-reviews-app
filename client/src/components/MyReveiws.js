import { useState, useEffect } from "react";
import axios from "axios";

function MyReviews() {
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [editingRating, setEditingRating] = useState(0);

    const [shareId, setShareId] = useState(null);
    const [shareToUserId, setShareToUserId] = useState("");

    const userId = localStorage.getItem("user_id");

    // FETCH REVIEWS
    useEffect(() => {
        const fetchReviews = () => {
            axios.get(`http://localhost:4005/myreviews/${userId}`)
                .then(resp => setData(resp.data.data))
                .catch(err => console.log(err));
        };
        fetchReviews();
    }, [userId]); // Added userId as dependency

    // DELETE REVIEW
    const handleDelete = (id) => {
        axios.delete(`http://localhost:4005/myreviews/${id}`)
            .then(() => {
                const fetchReviews = () => {
                    axios.get(`http://localhost:4005/myreviews/${userId}`)
                        .then(resp => setData(resp.data.data))
                        .catch(err => console.log(err));
                };
                fetchReviews();
            })
            .catch(err => console.log(err));
    };

    // EDIT REVIEW
    const handleEdit = (review) => {
        setEditingId(review.id);
        setEditingText(review.review);
        setEditingRating(review.rating);
    };

    // SAVE EDITED REVIEW
    const handleUpdate = (id) => {
        axios.put(`http://localhost:4005/myreviews/${id}`, {
            review: editingText,
            rating: editingRating
        }).then(() => {
            setEditingId(null);
            const fetchReviews = () => {
                axios.get(`http://localhost:4005/myreviews/${userId}`)
                    .then(resp => setData(resp.data.data))
                    .catch(err => console.log(err));
            };
            fetchReviews();
        }).catch(err => console.log(err));
    };

    // SHARE REVIEW
    const submitShare = () => {
        axios.post("http://localhost:4005/share", {
            review_id: shareId,
            user_id: shareToUserId
        })
            .then(() => {
                alert("Review shared!");
                setShareId(null);
                setShareToUserId("");
            })
            .catch(err => console.log(err));
    };

    // STYLES
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

    const buttonStyle = {
        border: "none",
        marginRight: "0.5rem",
        padding: "0.25rem 0.5rem",
        cursor: "pointer",
        background: "#007bff",
        color: "white",
    };

    const deleteBtn = {
        ...buttonStyle,
        background: "red"
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: "1rem" }}>My Reviews</h1>

            {data.length === 0 && <p>You have not written any reviews yet.</p>}

            {data.map((review) => (
                <div key={review.id} style={cardStyle}>
                    <div>
                        <span style={titleStyle}>{review.movie_title}</span>
                        {editingId !== review.id && (
                            <span style={badgeStyle}>{review.rating}/5</span>
                        )}
                    </div>

                    {/* EDIT MODE */}
                    {editingId === review.id ? (
                        <div>
                            <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                rows={3}
                                style={{ width: "100%", marginBottom: "0.5rem" }}
                            />
                            <input
                                type="number"
                                value={editingRating}
                                onChange={(e) => setEditingRating(e.target.value)}
                                min={1}
                                max={5}
                                style={{ width: "60px", marginBottom: "0.5rem" }}
                            />
                            <div>
                                <button style={buttonStyle}
                                    onClick={() => handleUpdate(review.id)}>Save</button>
                                <button style={buttonStyle}
                                    onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div>{review.review}</div>
                    )}

                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                        Last updated: {new Date(review.modified).toLocaleDateString()}
                    </div>

                    {/* ACTION BUTTONS */}
                    {editingId !== review.id && (
                        <div style={{ marginTop: "0.5rem" }}>
                            <button style={buttonStyle}
                                onClick={() => handleEdit(review)}>Edit</button>

                            <button style={deleteBtn}
                                onClick={() => handleDelete(review.id)}>Delete</button>

                            <button
                                style={{ ...buttonStyle, background: "green" }}
                                onClick={() => setShareId(review.id)}
                            >
                                Share
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* SHARE POPUP */}
            {shareId && (
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        background: "white",
                        padding: "1.5rem",
                        borderRadius: "10px",
                        width: "300px"
                    }}>
                        <h3>Share Review</h3>

                        <input
                            type="number"
                            placeholder="Enter user ID"
                            value={shareToUserId}
                            onChange={(e) => setShareToUserId(e.target.value)}
                            style={{ width: "100%", marginTop: "0.5rem" }}
                        />

                        <div style={{ marginTop: "1rem" }}>
                            <button
                                style={{ ...buttonStyle, background: "green" }}
                                onClick={submitShare}
                            >
                                Share
                            </button>

                            <button
                                style={{ ...buttonStyle, background: "red" }}
                                onClick={() => setShareId(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyReviews;
