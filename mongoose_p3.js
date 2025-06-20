const express=require('express');
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const app=express();
app.listen(3000);

app.use(express.json());

const userRouter=express.Router();
app.use('/user',userRouter);

userRouter
.route('/')
.get(getUsers)
.patch(updateUser)
.delete(deleteUser);


//read operation
async function getUsers(req,res){
    // let allUsers=await userModel.find();//bring all data
    let allUsers=await userModel.findOne({email:"abcd@gmail.com"});
    res.json({
        "message":"all users list",
        "data":allUsers
    })
}

//update
async function updateUser(req,res){
    let  dataUpdate=req.body;
    let user=await userModel.findOneAndUpdate({email:"sahil@gmail.com"},dataUpdate);
    console.log("backend ",user);
    res.json({
        "message":"data updated successfully",
        data:user
    })
}

//delete operation
async function deleteUser(req,res){
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        "message":"user deleted successfully",
        "data":user
    })
}

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

// create,post
async function postsignup(req,res){
    let dataobj=req.body;
    let obj=await userModel.create(dataobj);
    console.log("backend ",obj);
    res.json({
        "message":"user signup",
        "data":obj
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
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.password==this.confirmPassword;
        }
    }
})
//pre and post hooks
//after the save event occurs in db
// userSchema.post('save',function(doc){
//     console.log("after saving in db", doc);
// });

// //before the save event occurs in db
// userSchema.pre('save',function(){
//     console.log("before saving in db ",this);
// });
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})

const userModel=mongoose.model('userModel',userSchema);

//create operation
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


// createUser();

