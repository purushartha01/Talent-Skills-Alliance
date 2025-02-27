//package imports
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

//module imports
const { logger } = require('./middlewares/logger');
const { portno, dbConnectionString } = require('./config/serverConfig');
const { connectToDb } = require('./config/dbConfig');
const { errorHandler } = require('./middlewares/errorHandler');
const auths = require('./routes/auths');
const users = require('./routes/users');

//variables
const app = express();


//middlewares
app.use(logger);
app.use(cors(
    {
        origin: true,
        credentials: true,
    }
))
app.use(cookieParser())//TODO: NOTE=>cookies will be available either through req.cookies(without secret) and req.signedCookies(for signed data use in secret)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/auth', auths)
app.use('/api/v1/user', users)



app.use(errorHandler); //Catch-all error handler



connectToDb(dbConnectionString).then(() => {
    console.log(`Database connection established!`);
    app.listen(portno, () => {
        console.log(`Server listening on port ${portno}`);
    });
}).catch((err) => {
    console.log(`An error ocurred while connecting to the Database: ${err}`);
})