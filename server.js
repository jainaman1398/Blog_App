const express=require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let index=require("./app/routes/index");

const dbConfig = require('./config/database');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.use('/',index);



app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});