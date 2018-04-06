const mongoose = require('mongoose');

const SignupSchema = mongoose.Schema({
    Username:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    firstname:{
        type:String,required:true
    },
    lastname:{
        type:String,required:true
    },
    blogURL:{
        type:String,required:true
    },
    access_token:{
        type:String,required:true
    },
    followers:{
        type:Array
    }
});

module.exports = mongoose.model('Signup', SignupSchema);