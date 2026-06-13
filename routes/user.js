const express = require("express");
const {
  // handleGetAllUsers,
  // handleGetUserById,
  // handlePostUser,
  // handleUpdateUserById,
  // handleDeleteUserById,
  // handleUserPutById,
  handleUserSignUp,
  handleUserLogin
} = require("../controllers/user");

const userRouter = express.Router();

userRouter
.post("/",handleUserSignUp)
.post("/login",handleUserLogin)
// .get("/", handleGetAllUsers)
  // .post("/", handlePostUser)
  // .get("/:id", handleGetUserById)
  // .patch("/:id", handleUpdateUserById)
  // .delete("/:id", handleDeleteUserById) 
  // .put("/:id",handleUserPutById);

module.exports = userRouter;
