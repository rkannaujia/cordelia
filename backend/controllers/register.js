const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fileds are required"
            })
        }
        //first filnd that user is exist or not with the same email id or not
        const user = await User.findOne({ email });
        if (user) {
            return res.status(403).json({
                success: false,
                message: "This email id is already exists"
            })
        }
        // store hashed password in the database
        const hashedpassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname: fullName,
            email,
            password: hashedpassword
        })
        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: error
        })

    }
}

module.exports.register = register