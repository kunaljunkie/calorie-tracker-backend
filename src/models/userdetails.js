var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
ObjectId.prototype.valueOf = () => this.toString();
const userDetailsSchema = new mongoose.Schema(
    {
        bmr: {
            type: String,
        },
        date: {
            type: String,
        },
        caloriein: {
            type: String,
        },
        calorieout: {
            type: String,
        },
        netcalorie: {
            type: String,
        },
        mealtype: {
            type: String,
        },
        foodgroup: {
            type: String,
        },
        serving: {
            type: String,
        },
        activityname: {
            type: String,
        },
        activitydescription: {
            type: String,
        },
        met: {
            type: String,
        },
        duration: {
            type: String,
        },
        userid:{
            type : ObjectId,
            ref:"users"
        }

    },
    { strict: false, timestamps: true, collection: "usersDetails", versionKey: false }
);
const model = mongoose.model("usersDetails", userDetailsSchema);
module.exports = model;
