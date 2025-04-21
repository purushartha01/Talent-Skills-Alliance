require('dotenv').config();

const portno = process.env.PORTNO;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;


const dbConnectionString = `mongodb+srv://${mongo_username}:${mongo_password}@maincluster.wqqw6hg.mongodb.net/Talent-Skills-Alliance?retryWrites=true&w=majority&appName=MainCluster`;

const jwt_options_access = {
    algorithm: 'HS256',
    expiresIn: '30m'
}

const jwt_options_refresh = {
    algorithm: 'HS256',
    expiresIn: '1d'
}

const ACCESS_KEY = process.env.ACCESS_KEY;
const REFRESH_KEY = process.env.REFRESH_KEY;
const cookieSecret = process.env.COOKIE_SECRET;

const cookieOptionsAccess = {
    maxAge: 1000 * 60 * 30,
    expires: new Date(Date.now() + (1000 * 60 * 30)),
    httpOnly: true,
    signed: true
}


const cookieOptionsRefresh = {
    maxAge: 1000 * 60 * 30,
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
    httpOnly: true,
    signed: true
}

const mailerID = process.env.HELP_GMAIL;
const mailerPassKey = process.env.APP_PWD_HELP_GMAIL;

const imagKitPublicKey= process.env.IMAGEKIT_PUBLIC_KEY;
const imagKitPrivateKey= process.env.IMAGEKIT_PRIVATE_KEY;
const imagKitUrlEndpoint= process.env.IMAGEKIT_URL_ENDPOINT;


module.exports = {
    portno, dbConnectionString, jwt_options_access, jwt_options_refresh, ACCESS_KEY, REFRESH_KEY, cookieOptionsAccess, cookieOptionsRefresh, cookieSecret, mailerID, mailerPassKey, imagKitPublicKey, imagKitPrivateKey, imagKitUrlEndpoint
}