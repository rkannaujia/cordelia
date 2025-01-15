const logout = (req, res) => {
    res.clearCookie('auth_token');
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};
module.exports.logout = logout