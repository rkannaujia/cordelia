const Chat = require('../models/chat');

 const getChatHistory = async (req, res) => {
    try {
        const { userId1, userId2 } = req.query;

        if (!userId1 || !userId2) {
            return res.status(403).json({
                success: false,
                message: "User IDs are required"
            });
        }

        const chatHistory = await Chat.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 }
            ]
        }).sort({ timestamp: 1 });

        return res.status(200).json({
            success: true,
            chatHistory
        });
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports.getChatHistory = getChatHistory 