const express = require("express");
const status = require("http-status-codes");
const db = require("../data/dbConfig");
const checkCredentialsExist = require("../middleware/checkCredentialsExist");
const server = express();

server.get("/", (req, res) => {
    console.log(req.session);
    if (req.session && req.session.user) {
        return db("users")
            .select("username")
            .then(res2 => {
                
                res.status(status.OK).json(res2);
            })
            .catch(err => {
                res.status(status.INTERNAL_SERVER_ERROR).json({error: "Error retrieving user list"})
            })
    } else {
        res.status(status.UNAUTHORIZED).json({error: "Not logged in"});
    }
});

module.exports = server;