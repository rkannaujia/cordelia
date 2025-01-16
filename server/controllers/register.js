const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, password, userType } = req.body;
        if (!username || !password || !userType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(403).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword, userType });
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.register = register