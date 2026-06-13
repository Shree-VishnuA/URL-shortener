const express = require("express");
const staticRouter = express.Router();
const {restrictOnlyToLoggedInUsers} = require("../middlewares/auth")
const renderHomePage = require("../controllers/staticRoute");
const { render } = require("ejs");

staticRouter.get("/login",(req,res)=>{
    res.render("login")
})
staticRouter.get("/signup",(req,res)=>{
    res.render("signup")
})
staticRouter.get("/",restrictOnlyToLoggedInUsers,renderHomePage)

module.exports = staticRouter;












