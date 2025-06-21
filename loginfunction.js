authRouter
.route('/login')
.post(loginUser);

async function loginUser(req,res){
    try{
        let data=req.body;
        if(data.email){
            let user=await userModel.findOne({email:data.email});
            if(user){
                if(user.password==data.password){
                    res.json({
                        "message":"user logged in",
                        "userDetails":user
                    })
                }
                else{
                    res.json({
                        "message":"credential are wrong"
                    })
                }
            }
            else{
                res.json({
                    "message":"user not found"
                })
            }
        }
        else{
            res.json({
                    "message":"empty field found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
    
}
