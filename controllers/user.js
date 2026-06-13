const User = require("../models/user");
const {v4:uuid} = require("uuid")
const {getUser,mapUser} = require("../service/auth")
async function handleUserSignUp(req, res) {
  try {
    const { name, email, gender, password } = req.body;
    if (!req.body || !name || !email || !gender || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    console.log(req); 
    const object = await User.create({
      name,
      email,
      gender,
      password,
    });
    return res.redirect("/");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "Email already exists",
      });
    }
    return res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
}

async function handleUserLogin(req, res) {
  try{
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
  const sessionId = uuid();
  mapUser(sessionId,user);
  res.cookie("uid",sessionId);
  return res.redirect("/");
  }
  catch(err){
    return res.render("login", {
      error: "Something went wrong. Please try again.",
    });
  }
}

module.exports = {
  // handleGetAllUsers,
  // handleGetUserById,
  // handlePostUser,
  // handleUpdateUserById,
  // handleDeleteUserById,
  // handleUserPutById,
  handleUserSignUp,
  handleUserLogin,
};
