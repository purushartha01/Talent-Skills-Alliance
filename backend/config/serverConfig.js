require('dotenv').config();

const portno = process.env.PORTNO;
const mongo_username=process.env.MONGO_USERNAME;
const mongo_password=process.env.MONGO_PASSWORD;


const dbConnectionString=`mongodb+srv://${mongo_username}:${mongo_password}@maincluster.wqqw6hg.mongodb.net/Talent-Skills-Alliance?retryWrites=true&w=majority&appName=MainCluster`;

module.exports={
    portno,dbConnectionString
}