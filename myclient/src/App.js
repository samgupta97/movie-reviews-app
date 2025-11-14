import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { Home } from './components/Home';
import AllMovies from "./components/AllMovies";
import AllReveiws from './components/AllReveiws';
import MyReveiws from './components/MyReveiws';
import SharedWithMe from './components/SharedWithMe';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import SingleMovies from './components/SingleMovies';

import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  // 🔒 PROTECTED ROUTE
  function ProtectedRoute({ children }) {
    const user = localStorage.getItem("user_id");
    if (!user) return <Navigate to="/login" replace />;
    return children;
  }

  // 🚫 PUBLIC ROUTES BLOCKER
  function PublicRoute({ children }) {
    const user = localStorage.getItem("user_id");
    if (user) return <Navigate to="/home/movies" replace />;
    return children;
  }

  return (
    <div>
      <Routes>

        {/* PUBLIC ROUTES - BLOCKED IF LOGGED IN */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="movies" element={<AllMovies />} />
          <Route path="specificmovie/:id" element={<SingleMovies />} />
          <Route path="my-reviews" element={<MyReveiws />} />
          <Route path="shared-with-me" element={<SharedWithMe />} />
          <Route path="all-reviews" element={<AllReveiws />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
