const bcrypt = require("bcrypt");
const status = require("http-status-codes");

function checkCredentialsExist(req, res, next) {
    if (typeof req.body === "object") {
        if (typeof req.body.username === "string"
            && typeof req.body.password === "string") {
            req.credentials = {
                username: req.body.username,
                password: req.body.password,
            };
            next()
        } else {
            res.status(status.BAD_REQUEST).json({error: "Request body needs strings 'username' and 'password' for credentials"})
        }
    } else {
        res.status(status.BAD_REQUEST).json({error: "Request must contain a body with credentials"});
    }
}

module.exports = checkCredentialsExist;