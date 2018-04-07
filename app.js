const express=require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let index=require("./app/routes/index");

const dbConfig = require('./config/database');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// database Connection
mongoose.connect('mongodb://jainaman1398:mathematics@1298@ds237489.mlab.com:37489/blog-app')
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


//routing
app.use('/',index);



app.listen(process.env.port||3000,()=>{
    console.log("Server is listening on port 3000");
});