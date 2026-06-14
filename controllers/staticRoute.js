const URL = require("../models/url")

async function renderHomePage(req,res) {
    if(!req.user || !req.user._id){
        return res.redirect("/login")
    }
    const allURLs = await URL.find({createdBy: req.user._id});
    return res.render("home",{
        urls:allURLs,
        userName: req.user.name,
    })
}

module.exports = renderHomePage;