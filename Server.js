  const express = require("express");
  const path = require("path")
  const cookieParser = require("cookie-parser")

  //importing mongoDB connection finction
  const connectMongoDB = require("./connection");

  //importing routes
  const URL = require("./models/url");
  const userRouter = require("./routes/user");
  const urlRouter = require("./routes/url");
  const staticRouter = require("./routes/staticRoute")

  const {restrictOnlyToLoggedInUsers,checkAuth} = require("./middlewares/auth")

  const app = express();
  const PORT = 7000;

  //Middlewares
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());


  app.use(cookieParser());
  app.use(express.static("public"));
  app.use("/users", userRouter);
  app.use("/url",restrictOnlyToLoggedInUsers, urlRouter);
  app.use("/",checkAuth,staticRouter)

  //connecting mongo
  connectMongoDB("mongodb://127.0.0.1:27017/vishnu");

  app.set("view engine","ejs");
  app.set('views',path.resolve("./views"));

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
