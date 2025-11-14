import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4005/allmovies")
            .then((res) => {
                console.log(res.data.data[0].id);


                setMovies(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center">All Movies</h1>

            <div className="row">
                {movies.length === 0 && (
                    <p className="text-center">No movies available.</p>
                )}

                {movies.map((movie) => (
                    <div className="col-md-4 mb-4" key={movie.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">
                                        Release Date:{" "}
                                        {new Date(movie.release_date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={() => navigate(`/home/specificmovie/${movie.id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
