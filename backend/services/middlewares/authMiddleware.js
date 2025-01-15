const jwt = require('jsonwebtoken');
const config = require('../../config/data/config.json');
const SECRET_KEY = process.env.JWT_SECRET || config.IMP_KEY.SECRET_KEY;
console.log("SECRET_KEY=======>",SECRET_KEY)
const authenticate = (req, res, next) => {
    const token = req.cookies.auth_token; 
    console.log("req.cookies==>",req.cockies)

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Authentication token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("error", error);
        return res.status(403).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = authenticate;
