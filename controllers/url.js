const URL = require("../models/url");
const shortid = require("shortid");

async function handleGetNewShortId(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.render("error");
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.redirect("/");
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
  if (!entry) {
    return res.render("error");
  }
  res.redirect(entry.redirectUrl);
}


async function handleServerSideRendering(req, res) {
  if (!req.user || !req.user._id) {
    return res.redirect("/login");
  }

  const shortID = req.query.shortID;
  let object = null;

  if (shortID) {
    // Only allow viewing URLs that belong to the logged-in user
    object = await URL.findOne({
      shortId: shortID,
      createdBy: req.user._id,
    });
  }

  const allURLs = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    object,
    urls: allURLs,
    userName: req.user.name,
  });
}
module.exports = {
  handleGetNewShortId,
  handleRedirectOnOriginalUrl,
  handleServerSideRendering,
};
