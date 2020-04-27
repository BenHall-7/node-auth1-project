const status = require("http-status-codes");

module.exports = function(req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(status.UNAUTHORIZED).json({error: "Not logged in"});
    }
}