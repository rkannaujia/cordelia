const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/data/config.json');
const SECRET_KEY = process.env.JWT_SECRET || config.IMP_KEY.SECRET_KEY;

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        console.log("user=====>",user)
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(403).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username, userType: user.userType },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Set token in a cookie
        res.cookie('auth_token', token, {
            httpOnly: true, // Secure the cookie to prevent client-side access
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({
            success: true,
            message: `Welcome ${user.username}`,
            userType: user.userType
        });
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.login = login