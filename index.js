const express = require("express");
const status = require("http-status-codes");
const db = require("./data/dbConfig");

const users = require("./users");
const checkCredentialsExist = require("./middleware/checkCredentialsExist");

const server = express();
server.use(express.json());

server.use("/api/users", users);

server.post("/api/register", checkCredentialsExist, (req, res) => {
    db("users").insert(req.credentials)
        .then(([res2]) => {
            res.status(status.CREATED).json(res2);
        })
        .catch(err => {
            console.log(err);
            res.status(status.INTERNAL_SERVER_ERROR).json({error: "Error saving user to database"});
        })
})

server.post("/api/login", checkCredentialsExist, (req, res) => {
    
})

server.listen(5000, () => {
    console.log("listening on port 5000");
});