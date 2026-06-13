const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
       {timestamp:{
        type:Number
       }}
    ],
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  },
  { timestamps: true },
);

//MODEL
const URL = mongoose.model("URL", urlSchema);
module.exports = URL;
