const http=require("http");
const fs=require("fs");
const path=require("path");

const server=http.createServer((req,res)=>{
    console.log("request has been made");
    // console.log(req.method);
    // console.log(req.url);

    //sending plain text response
    // res.setHeader("Content-Type","text/plain");
    // res.write("hi this is a response from the server");

    //sending html response line by line
    res.setHeader("Content-Type","text/html");
    // res.write("<h1>hi this is a response from the server</h1>");
    // res.write("<h2>how</h2>");
    // res.end();

    //sending html file response using fs module to read the file
    // const cpath=path.join(__dirname,"index.html");
    // fs.readFile(cpath,(err,data)=>{
    //     if(err){
    //         console.log(err);
    //         // res.end();
    //     }else{
    //         // res.write(data);
    //         // res.end();
    //         res.end(data);
    //     }
    // }) 

    let curpath=path.join(__dirname,"views");
    switch(req.url){
        case '/':
            curpath=path.join(curpath,'index.html');
            res.statusCode=200;
            break;
        case '/about':
            curpath=path.join(curpath,'about.html');
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            curpath=path.join(curpath,'404.html');
            res.statusCode=404;
            break;
    }
    fs.readFile(curpath,(err,data)=>{

        if(err){
            console.log(err);
        }
        else{
            res.end(data);
        }
});
    
});

server.listen(3000,'localhost',(
    console.log("server is listening on port 3000")
))