import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

function SingleMovies() {

    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");

    const { id } = useParams();             // movie id
    const user_id = localStorage.getItem("user_id"); // logged in user id

    useEffect(() => {
        axios.get(`http://localhost:4005/specificmovie/${id}`)
            .then((resp) => {
                setMovie(resp.data.data[0]);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handlePostReview = () => {
        if (rating === "" || reviewText.trim() === "") {
            alert("Please fill rating and review");
            return;
        }

        axios.post("http://localhost:4005/addreview", {
            movie_id: id,
            user_id: user_id,
            rating: rating,
            review: reviewText
        })
            .then((resp) => {


                console.log(resp.data)
                setRating("");
                setReviewText("");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container my-5">

            <div className="card p-4 shadow-sm mb-4">
                <h2>{movie.title}</h2>
                <p>
                    <strong>Release Date: </strong>
                    {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString("en-US")
                        : ""}
                </p>
            </div>

            {/* Write Review Section */}
            <div className="card p-4 shadow-sm">
                <h4>Write a Review</h4>
                <hr />

                {/* Rating */}
                <label><strong>Rating</strong></label>
                <select
                    className="form-control mb-3"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="">Select Rating</option>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="5">5 ⭐</option>
                </select>

                {/* Review Text */}
                <label><strong>Your Review</strong></label>
                <textarea
                    className="form-control mb-3"
                    rows="4"
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>

                <button className="btn btn-primary" onClick={handlePostReview}>
                    Post Review
                </button>
            </div>

        </div>
    );
}

export default SingleMovies;
