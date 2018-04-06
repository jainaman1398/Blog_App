const mongoose =require('mongoose');

const BlogSchema = mongoose.Schema({
    Username:{
        type:String,required:true
    },
    Title:{
        type:String,required:true
    },
    content:{
        type:String,required:true
    }
});

module.exports = mongoose.model('Blogs', BlogSchema);