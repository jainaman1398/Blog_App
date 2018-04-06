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
    }
});

module.exports = mongoose.model('Signup', SignupSchema);