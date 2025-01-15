const express =require ('express');
const authenticate = require('../services/middlewares/authMiddleware');

const config = require('../config/data/config.json');
const router = express.Router();
const getUrlPrefix = config.app.prefix; 

const registerController = require('../controllers/register')
const loginController = require('../controllers/login')
const sendMessageController = require('../controllers/sendMessage')
const getChatHistoryController = require('../controllers/getChatHistory ')

console.log('getUrlPrefix',getUrlPrefix);

router.get(getUrlPrefix + '/ping',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "pong"
    });
});

router.post(getUrlPrefix + '/register',(req,res)=>{
    registerController.register(req,res)   
});
router.post(getUrlPrefix + '/login',(req,res)=>{
    loginController.login(req,res)   
});
router.post(getUrlPrefix + '/logout',(req,res)=>{
    logoutController.logout(req,res)   
});
router.post(getUrlPrefix + '/sendMessage', authenticate, (req,res)=>{
    sendMessageController.sendMessage(req,res)   
});
router.post(getUrlPrefix + '/getChatHistory', authenticate, (req,res)=>{
    getChatHistoryController.getChatHistory(req,res)   
});

module.exports = router;