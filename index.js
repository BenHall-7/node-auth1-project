const express = require("express");
const status = require("http-status-codes");
const session = require("express-session");
const bcrypt = require("bcrypt");
const db = require("./data/dbConfig");

const users = require("./users");
const checkCredentialsExist = require("./middleware/checkCredentialsExist");

const server = express();
server.use(express.json());
server.use(
    session({
        name: 'notsession', // default is connect.sid
        secret: 'nobody tosses a dwarf!',
        cookie: {
            maxAge: 1000*60*5, // 5 minutes
            secure: true, // only set cookies over https. Server will not send back a cookie over http.
        },
        httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
        resave: false,
        saveUninitialized: false,
    })
);

server.use("/api/users", users);

server.post("/api/register", checkCredentialsExist, (req, res) => {
    db("users").insert({
        username: req.credentials.username,
        password: bcrypt.hashSync(req.credentials.password, 10)
    })
        .then(([res2]) => {
            res.status(status.CREATED).json(res2);
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error: "Error registering user"});
        })
})

server.post("/api/login", checkCredentialsExist, (req, res) => {
    db("users").where({username: req.credentials.username}).first()
        .then(user => {
            if (!user || !bcrypt.compareSync(req.credentials.password, user.password)) {
                res.status(status.UNAUTHORIZED).json({error: "Username or password is incorrect"});
            } else {
                req.session.user = user.username;
                res.sendStatus(status.OK);
            }
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error: "Error logging in"});
        })
})

server.listen(5000, () => {
    console.log("listening on port 5000");
});