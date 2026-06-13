const {getUser}= require("../service/auth")

async function restrictOnlyToLoggedInUsers(req,res,next){   
    const userID = req.cookies.uid;
    if(!userID){
        return res.redirect("/login");
    }
    const user = getUser(userID);
    console.log(user);
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

async function checkAuth(req,res,next){   
    const userID = req.cookies.uid;
    
    const user = getUser(userID);
    
    req.user = user;
    next();
}

module.exports = {
    restrictOnlyToLoggedInUsers,
    checkAuth
}