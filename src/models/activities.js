

// activity
// "bicycling"
// specificMotion
// "bicycling, mountain, competitive, racing"
// METs
// 16
var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
ObjectId.prototype.valueOf = () => this.toString();
const activitySchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      trim: true,
    },
    specificMotion: {
      type: String,
    },
    METs: {
      type: Number,
     
    },
  },
  { strict: false, timestamps: true, collection: "activity", versionKey: false }
);
const model = mongoose.model("activity", activitySchema);
module.exports = model;
