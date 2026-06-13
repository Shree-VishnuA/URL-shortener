const URL = require("../models/url")

async function renderHomePage(req,res) {
    console.log("req.user =", req.user);
    if(!req.user){
        return res.redirect("/login")
    }
    const allURLs =await URL.find({createdBy:req.user?._id});
    return res.render("home",{
        urls:allURLs,
    })
}

module.exports = renderHomePage;