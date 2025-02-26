const express = require('express');



require('dotenv').config();

const { logger } = require('./middlewares/logger');

const app = express();
const portno = process.env.PORTNO;

app.use(logger);

app.listen(portno, () => {
    console.log(`Server listening on port ${portno}`);
});