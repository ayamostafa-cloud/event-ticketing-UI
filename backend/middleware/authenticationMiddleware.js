const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY

module.exports = function authenticationMiddleware(req, res, next) {
    const cookie = req.cookies;
    console.log('inside auth middleware');
    console.log('Cookies:', cookie);
    console.log('Secret Key:', secretKey);

    if (!cookie) {
        return res.status(401).json({ message: "No Cookie provided" });
    }
    const token = cookie.token;
    if (!token) {
        return res.status(405).json({ message: "No token provided" });
    }

    console.log('Token:', token);

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.log('Token verification error:', error.message);
            return res.status(403).json({ message: "Invalid token" });
        }

        console.log('Decoded token:', decoded);
        req.user = decoded.user;
        next();
    });
};