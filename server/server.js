const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "movie_reviews_app"
})


app.use(cors());

app.use(express.json())

app.post('/register', (req, res) => {

    const { first_name, last_name, email, password, mobile, birth } = req.body;

    const sql = "INSERT INTO users (first_name, last_name, email, password, mobile, birth) VALUES(?,?,?,?,?,?)";

    pool.query(sql, [first_name, last_name, email, password, mobile, birth], (err, data) => {
        if (data) {
            res.send({ status: "success", data: data })
        } else {
            res.send({ status: "error", error: err });
        }
    })

})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    pool.query(sql, [email, password], (err, data) => {

        if (data.length > 0) {
            res.send({ status: "success", data: data })
        } else {
            res.send({ status: "error", error: err })
        }

    })
})



app.get("/allmovies", (req, res) => {
    const sql = "SELECT * FROM movies";

    pool.query(sql, (err, data) => {
        if (data) {
            res.send({ status: "success", data: data })
        } else {
            res.send({ status: "error", error: err })
        }
    })
})



app.get("/allreviews", (req, res) => {
    const sql = `
        SELECT r.id, r.movie_id, r.review, r.rating, r.user_id, r.modified,
               u.first_name, u.last_name,
               m.title AS movie_title
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        JOIN movies m ON r.movie_id = m.id
        ORDER BY r.modified DESC
    `;

    pool.query(sql, (err, data) => {
        if (err) {
            res.send({ status: "error", error: err });
        } else {
            res.send({ status: "success", data: data });
        }
    });
});


app.put("/updateProfile/:id", (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, mobile, birth } = req.body;

    const sql = `
        UPDATE users
        SET first_name = ?, last_name = ?, email = ?, mobile = ?, birth = ?
        WHERE id = ?
    `;

    pool.query(sql, [first_name, last_name, email, mobile, birth, userId], (err, result) => {
        if (err) return res.status(500).send({ status: "error", error: err });
        res.send({ status: "success", message: "Profile updated successfully" });
    });
});

app.put("/changePassword/:id", (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;


    pool.query(
        "SELECT password FROM users WHERE id = ?",
        [id],
        (err, data) => {
            if (data.length === 0) return res.status(404).send({ status: "error", message: "User not found" });

            if (data[0].password !== oldPassword) {
                return res.status(400).send({ status: "error", message: "Old password is incorrect" });
            }

            // Update password
            pool.query(
                "UPDATE users SET password = ? WHERE id = ?",
                [newPassword, id],
                () => {
                    res.send({ status: "success", message: "Password changed successfully" });
                }
            );
        }
    );
});


app.get('/myreviews/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM reviews WHERE user_id = ?";
    pool.query(sql, [id], (err, data) => {
        if (err) return res.send({ status: "error", error: err });
        res.send({ status: "success", data });
    });
});


app.delete('/myreviews/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM reviews WHERE id = ?";
    pool.query(sql, [id], (err, data) => {
        if (err) return res.send({ status: "error", error: err });
        res.send({ status: "success", message: "Review deleted successfully." });
    });
});


app.put('/myreviews/:id', (req, res) => {
    const { id } = req.params;
    const { review, rating } = req.body;
    const sql = "UPDATE reviews SET review = ?, rating = ?, modified = NOW() WHERE id = ?";
    pool.query(sql, [review, rating, id], (err, data) => {
        if (err) return res.send({ status: "error", error: err });
        res.send({ status: "success", message: "Review updated successfully." });
    });
});


app.get('/specificmovie/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM movies where id=?";
    pool.query(sql, [id], (err, data) => {
        if (err) return res.send({ status: "error", error: err });
        res.send({ status: "success", data: data });
    });
});

app.post("/addreview", (req, res) => {
    const { movie_id, user_id, rating, review } = req.body


    const sql = "insert into reviews(movie_id, user_id, rating, review) VALUES(?,?,?,?)"

    pool.query(sql, [movie_id, user_id, rating, review], (err, data) => {
        if (data) {
            res.send({ status: "success", data: data })
        } else {
            res.send({ status: "error", error: err })
        }
    })


})


app.get('/shared-with-me/:id', (req, res) => {
    const userId = req.params.id;

    const sql = `
        SELECT r.*, m.title 
        FROM shares s
        JOIN reviews r ON s.review_id = r.id
        JOIN movies m ON r.movie_id = m.id
        WHERE s.user_id = ?
    `;

    pool.query(sql, [userId], (err, data) => {
        if (err) return res.send({ status: "error", error: err });
        res.send({ status: "success", data });
    });
});


app.post('/share', (req, res) => {
    const { review_id, user_id } = req.body; // user_id = recipient user

    const sql = `
        INSERT INTO shares (review_id, user_id)
        VALUES (?, ?)
    `;

    pool.query(sql, [review_id, user_id], (err) => {
        if (err) {
            return res.send({ status: "error", error: err });
        }
        res.send({ status: "success", message: "Review shared!" });
    });
});





app.listen(4005, 'localhost', () => {
    console.log("server started at port nno 4005");
})
