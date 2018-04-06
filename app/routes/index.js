let express = require('express');
let router = express.Router();

const handler=require("../controllers/function_handlers");

router.get('/',function (req,res) {
    res.send("hell0,from router");
});

router.post('/register', handler.register);

router.post('/login',handler.login);

router.post('/blogpost',handler.blogpost);

router.put('/follow/:username',handler.follow);

module.exports=router;