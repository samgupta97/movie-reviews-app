🎬 Movie Reviews App

A full-stack React + Express + MySQL movie review platform.
Users can write reviews, update them, delete them, and share them with other users.

🚀 Features
👤 User Features

Register & Login

Prevent access to login/register when already logged in

Update profile

Change password

🎞️ Movies

View all movies

View single movie

Add review & rating

📝 Reviews

View your reviews

Edit review

Delete review

Shows last updated time

🔗 Share Reviews

Share your review with other users

Shared reviews appear under Shared With Me

🗄️ Database Structure
users
Column	Type
id	INT (PK)
first_name	TEXT
last_name	TEXT
email	TEXT UNIQUE
password	TEXT
mobile	TEXT
birth	DATE
movies
Column	Type
id	INT (PK)
title	VARCHAR(255)
release_date	DATE
reviews
Column	Type
id	INT (PK)
movie_id	INT (FK)
user_id	INT (FK)
rating	INT
review	TEXT
modified	TIMESTAMP
shares
Column	Type
review_id	INT (FK)
user_id	INT (FK)
🛠 Backend Technologies

Node.js

Express.js

MySQL2

CORS

REST API

📡 API Endpoints
Auth
Method	Route	Description
POST	/register	Register user
POST	/login	Login user
Movies
Method	Route
GET	/allmovies
GET	/specificmovie/:id
Reviews
Method	Route
GET	/myreviews/:id
POST	/addreview
PUT	/myreviews/:id
DELETE	/myreviews/:id
GET	/allreviews
Share
Method	Route
POST	/share
GET	/shared-with-me/:id
Profile
Method	Route
PUT	/updateProfile/:id
PUT	/changePassword/:id
▶️ Running the Project
Backend
cd server
npm install
node index.js

Frontend
cd client
npm install
npm start

📂 Project Structure
movie-reviews-app/
│── server/
│── client/
│── README.md

📜 License

Free to use.
