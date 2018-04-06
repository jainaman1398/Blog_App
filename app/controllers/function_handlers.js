const Signup=require("../model/signup_model");

exports.register=(req,res)=>{

    if(!req.body.Username||!req.body.password||!req.body.firstname||!req.body.lastname||!req.body.blogURL) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }
    console.log(req.body.Username);
    const signup=new Signup({
        Username:req.body.Username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        blogURL:req.body.blogURL
    });

    signup.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while registering the user."
        });
    });

};