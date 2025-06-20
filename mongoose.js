const express=require('express');
const mongoose=require('mongoose');
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


//mongoose part


const dblink='mongodb+srv://sahilsinha:DPxTnNfimgJbNRYb@cluster0.sdvgp.mongodb.net/';
mongoose.connect(dblink)
.then(function(db){
    console.log("db is connected");
})
.catch(function (err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
})

const userModel=mongoose.model('userModel',userSchema);

async function createUser(){
    let user={
        name:"sahil",
        email:"abced@gmail.com",
        password:12345678,
        confirmPassword:12345678
    }
    let data=await userModel.create(user);
    console.log(data);
}

createUser();
