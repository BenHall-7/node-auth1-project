const express = require("express");
const checkCredentialsExist = require("../middleware/checkCredentialsExist");
const server = express();

server.get("/", checkCredentialsExist, (req, res) => {

});

module.exports = server;