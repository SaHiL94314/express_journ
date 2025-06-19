const express=require('express');
const app=express();
app.listen(3000);

app.use(express.json());

//query
app.get('/user',(req,res)=>{
    console.log(req.query);
    res.send("query received successfully");
})

//params
app.get('/user/:username',(req,res)=>{
    console.log(req.params.username);
    console.log(req.params);
    res.send("data received successfully");
})