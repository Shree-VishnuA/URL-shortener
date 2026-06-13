const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((err) => {
      console.log("Error in Connecting MongoDB!", err);
    });
}

module.exports = connectMongoDB;
