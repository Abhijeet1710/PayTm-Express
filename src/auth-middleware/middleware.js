const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");

const setHeadersMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next()
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Auth : "+JSON.stringify(decoded));
        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
    } catch (err) {
        return res.status(401).json({});
    }
};

module.exports = {
    authMiddleware,
    setHeadersMiddleware
}