const express=require('express');
const app=express();
app.listen(3000);

app.use(express.json());

const authRouter=express.Router();
app.use('/auth',authRouter);

authRouter
.route('/signup')
.get(getsignup)
.post(postsignup)

function getsignup(req,res){
    res.sendFile('/index.html',{root:__dirname});
    // res.send('hi');
}
function postsignup(req,res){
    console.log("backend ",req.body);
    res.json({
        "message":"user signup",
        "data":req.body
    })
}