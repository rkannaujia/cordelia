const express = require("express");
const dotenv = require("dotenv");
const config = require('./config/data/config.json');
const connectDb = require("./utils/MongoDB/db");
const indexRouter = require('./routes/index')
// const cors =require ('cors');

const app = express();
const getUrlPrefix = config.app.prefix;
dotenv.config();
global.config = require('./config/data/config.json');
global.connectDb = require('./utils/MongoDB/db').connectDb

app.use(express.json());
// app.use(cors())
app.use('/',indexRouter);


/*Server start */
const port = process.env.PORT || config.server.port
const server = app.listen(port)
console.log('Api is running on port',port)
console.log(`try this url http://localhost:${port}${getUrlPrefix}/ping`);

 connectDb();
module.exports = app