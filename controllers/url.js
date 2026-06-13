const URL = require("../models/url");
const shortid = require("shortid");

async function handleGetNewShortId(req, res) {
  console.log(req.body);
  const body = req.body;
  if (!body.url) {
    return res.render("error");
  }
  const shortID = shortid();
  const object = await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  console.log(object);
  return res.render("home", {
    object,
  });
}

async function handleRedirectOnOriginalUrl(req, res) {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.redirectUrl);
} 


async function handleServerSideRendering(req, res) {
  const shortID = req.query.shortID;

  let object = null;

  if (shortID) {
    object = await URL.findOne({
      shortId: shortID,
    });
  }

  return res.render("home", {
    object,
  });
}
module.exports = {
  handleGetNewShortId,
  handleRedirectOnOriginalUrl,
  handleServerSideRendering,
};
