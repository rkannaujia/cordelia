const express =require ('express');

const config = require('../config/data/config.json');
const router = express.Router();
const getUrlPrefix = config.app.prefix; 

console.log('getUrlPrefix',getUrlPrefix);

router.get(getUrlPrefix + '/ping',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "pong"
    });
});


module.exports = router;