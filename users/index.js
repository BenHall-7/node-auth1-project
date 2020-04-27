const express = require("express");
const status = require("http-status-codes");
const db = require("../data/dbConfig");
const server = express();

server.get("/", (req, res) => {
    return db("users")
        .select("username")
        .then(res2 => {
            
            res.status(status.OK).json(res2);
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error: "Error retrieving user list"})
        })
});

module.exports = server;