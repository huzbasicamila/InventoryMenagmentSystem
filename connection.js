const mysql= require('mysql');
require('dotenv').config();

var connection=mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err)=>{
    //provjera konekcije
    if (connection.state === 'connected') {
        console.log('Connected to MySQL Database');
    } else if (connection.state === 'disconnected') {
        console.log('Disconnected from MySQL Database');
    } else if (connection.state === 'connecting') {
        console.log('Connecting to MySQL Database');
    } else if (connection.state === 'protocol_error') {
        console.log('Protocol error with MySQL Database connection');
    }
    
    if(!err){
        console.log("Connected");
    }
    else {
        console.log(err);
    }
});

module.exports=connection;
