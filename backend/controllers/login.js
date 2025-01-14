const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fileds are required"
            })
        }
        //first filnd that user is exist or not with the same email id or not
        const user = await User.findOne({ email });
        console.log("user", user);

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "email or password incorrect"
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(403).json({
                success: false,
                message: "email or password incorrect"
            })
        }
        return res.status(200).json({
            success: true,
            message: `Welcome ${user.fullname}`
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

module.exports.login = login