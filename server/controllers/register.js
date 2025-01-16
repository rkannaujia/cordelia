const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, password, userType } = req.body;

        res.setHeader('Access-Control-Allow-Origin', 'https://cordelia-client.onrender.com');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        if (!username || !password || !userType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(403).json({
                success: false,
                message: "Username already exists"
            });
        }

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

        res.setHeader('Access-Control-Allow-Origin', 'https://cordelia-client.onrender.com');
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.register = register;
