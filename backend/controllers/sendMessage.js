const Chat = require('../models/chat.js');

const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;

        if (!sender || !receiver || !message) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        const chat = new Chat({
            sender,
            receiver,
            message,
            status: 'sent'
        });
        await chat.save();

        // Emulate real-time delivery status (WebSocket implementation assumed)
        chat.status = 'delivered';
        await chat.save();

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            chat
        });
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.sendMessage = sendMessage
