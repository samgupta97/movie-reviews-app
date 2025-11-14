🎬 Movie Reviews App

A full-stack application where users can register, log in, view movies, write reviews, rate them, edit/delete reviews, and share reviews with other users.

🚀 Features
👤 Authentication

Register

Login

Prevent logged-in user from accessing login/register again

Basic credential validation

🎬 Movies

Get all movies

View specific movie details

✍️ Reviews

Add review

Edit review

Delete review

View reviews written by logged-in user

View all reviews

🔗 Share Reviews

Share any review with another user

See all reviews shared with you

👤 User Profile

Update profile

Change password

🗂️ Project Structure
movie-reviews-app/
│
├── client/           # React Frontend
│   └── src/
│
└── server/           # Express + MySQL Backend
    ├── index.js      # All routes in one file (your setup)
    ├── package.json
    └── ...

🛠️ Tech Stack
Frontend

React

React Router

Axios

Backend

Node.js

Express.js

MySQL2

CORS

Database

MySQL

🗄️ Database Tables

Below are the tables supported by your backend code.

users
id (PK)
first_name
last_name
email
password
mobile
birth

movies
id (PK)
title
release_date

reviews
id (PK)
movie_id (FK → movies.id)
user_id (FK → users.id)
review
rating
modified (timestamp)

shares
review_id (FK → reviews.id)
user_id (FK → users.id)   # recipient user

📡 API Endpoints (Backend)

Below are the exact endpoints defined in your code.

🔐 Authentication
POST /register

Create new user.

POST /login

Login using email & password.

👤 User Routes
PUT /updateProfile/:id

Update profile fields.

PUT /changePassword/:id

Change password (checks old password).

🎬 Movies
GET /allmovies

Get all movies.

GET /specificmovie/:id

Get movie by ID.

✍️ Reviews
GET /allreviews

Fetch all reviews with:

reviewer name

movie title

rating & review

POST /addreview

Add review for a movie.

Body:

{
  movie_id,
  user_id,
  rating,
  review
}

GET /myreviews/:id

Get all reviews written by specific user.

PUT /myreviews/:id

Update a review.

DELETE /myreviews/:id

Delete a review.

🔗 Share Reviews
POST /share

Share a review with another user.

Body:

{
  review_id,
  user_id   # recipient
}

GET /shared-with-me/:id

Fetch all reviews shared with logged-in user.

▶️ How To Run
1. Start MySQL

Make sure the database movie_reviews_app exists.

2. Start Backend
cd server
npm install
node index.js


Server runs at:

http://localhost:4005

3. Start Frontend
cd client
npm install
npm start


Runs at:

http://localhost:3000

🎯 Future Improvements

JWT Auth

Password hashing

Upload movie posters

Like/Dislike reviews

Admin dashboard