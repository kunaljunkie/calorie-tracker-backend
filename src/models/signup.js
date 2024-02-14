var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
ObjectId.prototype.valueOf = () => this.toString();
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim:true
    },
    height: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
  },
  { strict: false, timestamps: true, collection: "users", versionKey: false }
);
const model = mongoose.model("users", userSchema);
module.exports = model;
