const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  customerId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true 
    },
  agentId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  messages: [
    {
      senderId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true 
        },
      message: {
         type: String, 
         required: true 
        },
      status: { 
        type: String,
         enum: ['sent', 'delivered', 'read'], 
         default: 'sent' },
      timestamp: { 
        type: Date, 
        default: Date.now 
    },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);
