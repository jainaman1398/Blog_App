const Signup=require("../model/signup_model");
const Blog=require("../model/blog_model");
const faker=require('faker');

exports.register=(req,res)=>{

    //checking content
    if(!req.body.Username||!req.body.password||!req.body.firstname||!req.body.lastname||!req.body.blogURL) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }

    console.log(req.body.Username);

    //searchig for user in database
    Signup.findOne({Username:req.body.Username},function (err,user) {
        if(err)
            throw err;
        else
        {
            //if username is available then create this user
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
            //username is already in use
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
    //checking for data
    if(!req.body.Username||!req.body.password) {
        return res.status(400).send({
            message: "Enter User Credentials"
        });
    }

    //searching for user in database
    Signup.findOne({'Username':req.body.Username},function (err,user) {
        //user is not present
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
            /*user successfully logged in ,in response we are sending unique access_token to user
            which he/she can use for future purposes for authentication*/
            if(user.password===req.body.password)
            {
                res.send({access_token:user.access_token});
            }
            else
            {
                //password is incorrect
                return res.status(400).send({
                    message: "Password is not correct"
                });
            }
        }
    });
};

exports.blogpost=(req,res)=>{
    //checking for data content
    if(!req.body.Title||!req.body.content) {
        return res.status(400).send({
            message: "data can't be empty"
        });
    }

    let token=req.body.access_token,User;
console.log(token);


    //finding user using access_token
    Signup.findOne({access_token:token},function (err,user) {
        if(err)
            throw err;
        else
        {
            //access_token is not present at database
            if(user===undefined||user==null)
            {
                return res.status(400).send({
                    message: "invalid access token"
                });
            }
            else {
                //creating new blog entry into database
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

exports.follow=(req,res)=>{
    let msg;
    let t=1;
    console.log(req.params.username);
    if(!req.params.username) {
        msg="invalid username";
    }

    //searching for username in database which is to be followed
    Signup.findOne({Username:req.params.username},(err,res1)=>{
        if(err)
            throw err;
        else if(res1===undefined||res1===null)
        {
            console.log(res1);
            msg="invalid username";
            t=0;
        }
    });

    let token=req.body.access_token;
    console.log(token);
    Signup.findOne({access_token:token},function (err,user) {
        if(err)
            throw err;
        else
        {
              // token is valid i.e user is not authorized
            console.log(user);
            if(user===null||user===undefined)
            {
                msg="invalid access token";
                t=0;
            }

            else if(user.Username===req.params.username)
            {
                msg="can't follow yourself"
                t=0;
            }

            //searching for followers array to check condition ,if this username is present in follower array or not
            if(user!=null||user!=undefined) {
                user=user||[];
                console.log(user);
                user.followers.forEach(function (item, index) {
                    if (item === req.params.username) {
                        msg = "already followed"
                        t = 0;
                    }
                });
            }

             //all good,updating followers array by appending new follower
              if(t===1) {
                  let new_followers = user.followers;
                  new_followers.push(req.params.username);
                  Signup.findOneAndUpdate({access_token: token}, {$set: {followers: new_followers}}, function (err1, user1) {
                      if (err)
                          throw err1;
                      else
                          res.send(user1);
                  });
              }
              else
              {
                  return res.status(504).send({
                      message:msg
                  });
              }

        }
    });
};

exports.feed=(req,res)=>{
    let token=req.headers.access_token;
console.log(token);

 //searching in database using access_token
    Signup.findOne({access_token:token},(err,user)=>{
        if(err)
            throw err;
        else
        {
            //user is not authorized so can't proceed further
            if(user===null||user===undefined)
            {
                return res.status(400).send({
                    message: "Invalid Access_token"
                });
            }

            else
            {
                let obj=[];

                    let yo=0;
                    //iterating over followers array
                    user.followers.forEach(function (item, index) {
                        console.log(item);
                        //extracting all blogs of a particular follower
                        Blog.find({Username: item}, (err, blogs) => {
                            if (err)
                                throw err;
                            else {
                                console.log(blogs);
                                yo++;
                                obj.push(blogs);
                                if(yo===user.followers.length)
                                    res.send(obj);
                            }
                        })
                    });
                console.log(yo);
            }
        }
    })
}
