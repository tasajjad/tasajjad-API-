// Package
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');;
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const formidable = require('express-formidable');
//External Import 
const userRouter = require('./routers/userRouters');
const notFound = require('./errors/notFound')
const defaultError = require('./errors/default');

app.use(express.json())
// for req.fields
//app.use(formidable())
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('dev'));
};

app.use(cors());
app.use('/api/user/', userRouter);
app.use(notFound);
app.use(defaultError);



module.exports = app;