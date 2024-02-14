var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
ObjectId.prototype.valueOf = () => this.toString();
const userDataSchema = new mongoose.Schema(
    {
        bmr: {
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
        date:{
            type: String,
        },
        // mealtype: {
        //     type: String,
        // },
        // foodgroup: {
        //     type: String,
        // },
        // serving: {
        //     type: String,
        // },
        // activityname: {
        //     type: String,
        // },
        // activitydescription: {
        //     type: String,
        // },
        // met: {
        //     type: String,
        // },
        // duration: {
        //     type: String,
        // },
        userid:{
            type : ObjectId,
            ref:"users"
        }

    },
    { strict: false, timestamps: true, collection: "userData", versionKey: false }
);
const model = mongoose.model("userData", userDataSchema);
module.exports = model;
