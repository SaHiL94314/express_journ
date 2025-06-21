const cookieParser=require('cookie-parser');
app.use(cookieParser());


// experimenting with cookies
userRouter
.route('/setCookie')
.get(setCookies);

userRouter
.route('/getCookie')
.get(getCookies);
function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
    res.cookie('isPrime',false);
    res.send("cookie has been sent");
}
function getCookies(req,res){
    let cookie=req.cookies;
    console.log(cookie);
    res.send("cookies received");
}
