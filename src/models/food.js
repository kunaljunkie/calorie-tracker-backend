// ID
// 167512
// name
// "Pillsbury Golden Layer Buttermilk Biscuits Artificial Flavor Refrigera…"
// FoodGroup
// "Baked Foods"
// Calories
// 307
// Fat
// 13.24
// Protein
// 5.88
// Carbohydrate
// 41.18
// ServingDescription
// "1 serving"

var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
ObjectId.prototype.valueOf = () => this.toString();
const food = new mongoose.Schema(
  {
    ID: {
      type: Number,
     
    },
    name: {
      type: String,
    },
    FoodGroup: {
      type: String,
     
    },
    Calories: {
      type: Number,
  
    },
    Fat: {
      type: Number,
    },
    Protein:{
      type:Number,
     
    },
    Carbohydrate:{
        type:Number,
      
      },
      ServingDescription:{
        type:String,
       
      },
     
  },
  { strict: false, timestamps: true, collection: "food", versionKey: false }
);
const model = mongoose.model("food", food);
module.exports = model;
