const express=require('express');
const app=express();
app.listen(3000);

app.use(express.json());
let users=[
    {
        "id":1,
        "name":"John Doe"
    },
    {
        "id":2,
        "name":"Jane Smith"
    }
];
//mini app
const userRouter=express.Router();

//base route, router to use
app.use('/user',userRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser) 
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

function getUser(req,res){
    res.send(users);
}
function postUser(req,res){
    users=req.body;
    res.json({
        "message":"data received successfully",
        "user":req.body
    })
}
function updateUser(req,res){
    for(key in req.body){
        users[key]=req.body[key];
    }
    res.json({
        "message":"data updated successfully"
    })
}
function deleteUser(req,res){
    users={};
    res.json({
        "message":"data deleted successfully"
    })
}

function getUserById(req,res){
    const reqid=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i].id==reqid){
            obj=users[i];
            break;
        }
    }
    res.json({
        "message":"user found",
        "user":obj
    })
}