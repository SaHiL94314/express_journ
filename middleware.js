const express=require('express');
const app=express();
app.listen(3000);

app.use(express.json());

const authRouter=express.Router();
app.use('/auth',authRouter);

authRouter
.route('/signup')
.get(middleware1,getsignup,middleware2)
.post(postsignup)

function middleware1(req,res,next){
    console.log("middleware1 encountered");
    next();
}
function middleware2(req,res,next){
    console.log("middleware 2 called");
    console.log("middleware2 ended req/res cycle");
    res.sendFile('/index.html',{root:__dirname});
}
function getsignup(req,res,next){
    console.log("getsignup is called");
    // res.sendFile('/index.html',{root:__dirname});
    // res.send('hi');
    next();
}
function postsignup(req,res){
    console.log("backend ",req.body);
    res.json({
        "message":"user signup",
        "data":req.body
    })
}