const Signup=require("../model/signup_model");
const Blog=require("../model/blog_model");
const faker=require('faker');

exports.register=(req,res)=>{

    if(!req.body.Username||!req.body.password||!req.body.firstname||!req.body.lastname||!req.body.blogURL) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }
    console.log(req.body.Username);
    Signup.findOne({Username:req.body.Username},function (err,user) {
        if(err)
            throw err;
        else
        {
            if(user===null)
            {
                let token=faker.random.number();
                const signup=new Signup({
                    Username:req.body.Username,
                    password:req.body.password,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    blogURL:req.body.blogURL,
                    access_token:token
                });

                signup.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while registering the user."
                    });
                });
            }
            else
            {
                res.status(500).send({
                    message: "Username is not available"
                });
            }
        }
    });

};

exports.login=(req,res)=>{
    if(!req.body.Username||!req.body.password) {
        return res.status(400).send({
            message: "Enter User Credentials"
        });
    }

    Signup.findOne({'Username':req.body.Username},function (err,user) {
        if(user===undefined||user==null)
        {
            return res.status(400).send({
                message: "User is not registered"
            });
        }
        if(err) {
            return res.status(400).send({
                message: err
            });
        }
        else
        {
            console.log(user);
            if(user.password===req.body.password)
            {
                res.send({access_token:user.access_token});
            }
            else
            {
                return res.status(400).send({
                    message: "Password is not correct"
                });
            }
        }
    });
};

exports.blogpost=(req,res)=>{
    if(!req.body.Title||!req.body.content) {
        return res.status(400).send({
            message: "data can't be empty"
        });
    }

    let token=req.body.access_token,User;
console.log(token);

    if (!ObjectId.isValid(token))
        return Error({ status: 422 });

    Signup.findOne({access_token:token},function (err,user) {
        if(err)
            throw err;
        else
        {
            if(user===undefined||user==null)
            {
                return res.status(400).send({
                    message: "invalid access token"
                });
            }
            else {
                User = user.Username;
                const blog=new Blog({
                    Username:User,
                    Title:req.body.Title,
                    content:req.body.content
                });

                blog.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while saving the blog."
                    });
                });
            }
        }
    })
};