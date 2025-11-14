import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("user_id");

        // If no user_id → block access & redirect to login
        if (!id) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">

                    <span className="navbar-brand fw-bold">Movie Reviews</span>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="movies">All Movies</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="my-reviews">My Reviews</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="shared-with-me">Shared With Me</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="all-reviews">All Reviews</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="edit-profile">Edit Profile</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="change-password">Change Password</Link>
                            </li>

                            <button
                                className="btn btn-danger ms-3"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </ul>
                    </div>
                </div>
            </nav>

            <div style={{ padding: "1rem" }}>
                <Outlet />
            </div>
        </div>
    );
}
