const express = require("express");
const {handleGetNewShortId, handleRedirectOnOriginalUrl,handleServerSideRendering} = require("../controllers/url");
const urlRouter = express.Router();

urlRouter.get("/:shortID",handleRedirectOnOriginalUrl);
urlRouter.get("/",handleServerSideRendering);
urlRouter.post("/",handleGetNewShortId);

module.exports = urlRouter;
