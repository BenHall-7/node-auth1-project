const express = require("express");

const users = require("./users");

const server = express();
server.use(express.json());

server.use("/api/users", users);

server.listen(5000, () => {
    console.log("listening on port 5000");
});