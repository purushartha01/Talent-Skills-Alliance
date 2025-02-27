const mongoose = require('mongoose');

const connectToDb = (mongoURI) => {
    return mongoose.connect(mongoURI);
}

module.exports={
    connectToDb
}