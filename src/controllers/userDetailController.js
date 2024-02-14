const userdetailmodel = require('../models/userdetails')
const usermodel = require('../models/signup')
const foodmodel = require('../models/food')
const userDataModel = require('../models/userdata')

exports.userdetails = async (req, res) => {

    try {
        const { userid, fooddata, activitydata } = req.body


        const userdata = await usermodel.findById(userid)
        const food = await foodmodel.find({ ID: fooddata.foodname })
        let gender = userdata.Gender
        let BMR, netCaloriesPerDay, caloriesOutForActivities, caloriesin

        let activityDutation = Number(activitydata.ActivityDuration) / 60
        if (gender === 'Male') {
            BMR = 66.4730 + (13.7516 * userdata.Weight) + (5.0033 * userdata.Height) - (6.7550 * userdata.Age)
        } else if (gender === 'Female') {
            BMR = 655.0955 + (9.5634 * userdata.Weight) + (1.8496 * userdata.Height) - (4.6756 * userdata.Age)
        }

        const userPerDay = await userDataModel.findOne({ userid: userid, date: fooddata.date ? fooddata.date : activitydata.activityDate })
        if (userPerDay) {
            caloriesin = food[0].Calories * Number(fooddata.serving)
            let caloriein = Number(caloriesin) + Number(userPerDay.caloriein)

            caloriesOutForActivities = activitydata.metvalue * userdata.Weight * activityDutation
            let calorieout = Number(caloriesOutForActivities) + Number(userPerDay.calorieout)

            let netcalorie = Number(caloriein) - Number(calorieout)
            await userDataModel.updateOne({ userid: userid }, {
                $set: {
                    caloriein: caloriein.toString(),
                    calorieout: calorieout.toString(),
                    netcalorie: netcalorie.toString(),
                    bmr: BMR,
                    date: fooddata.date,
                    userid: userid
                }
            },
                { new: true }
            )
        } else {
            caloriesin = food[0].Calories * Number(fooddata.serving)

            caloriesOutForActivities = activitydata.metvalue * userdata.Weight * activityDutation

            netCaloriesPerDay = caloriesin - caloriesOutForActivities
            await userDataModel.create({
                caloriein: caloriesin,
                calorieout: caloriesOutForActivities,
                netcalorie: netCaloriesPerDay,
                bmr: BMR,
                userid: userid,
                date: fooddata.date,

            })
        }

        let objectForinsert = {
            bmr: BMR,
            date: fooddata.date,
            caloriein: caloriesin,
            calorieout: caloriesOutForActivities,
            netcalorie: netCaloriesPerDay,
            foodname: food[0].name,
            mealtype: fooddata.mealtype,
            foodgroup: fooddata.foodgroup,
            serving: fooddata.serving,
            activityname: activitydata.ActivityName,
            activitydescription: activitydata.ActivityDescription,
            met: activitydata.metvalue,
            duration: activitydata.ActivityDuration,
            userid: userid
        }

        const data = await userdetailmodel.create(objectForinsert)
        if (data) {
            res.status(201).json({ details: data, mesage: "successfull", code: 201 })
        }

    } catch (error) {
        res.status(501).json({ error: error.message })
    }

}


exports.getalluserdetails = async (req, res) => {
    try {
        const { userid, date } = req.query
        if (date) {
            const data = await userDataModel.find({ userid: userid, date: date }).populate('userid')
            if (data.length) {
                res.status(201).json({ data: data, mesage: "successfull", code: 201 })
            } else {
                res.status(201).json({ data: data, mesage: "no data Found", code: 201 })
            }
        } else {
            const data = await userDataModel.find({ userid: userid }).populate('userid')
            if (data.length) {
                res.status(201).json({ data: data, mesage: "successfull", code: 201 })
            } else {
                res.status(201).json({ data: data, mesage: "no data Found", code: 201 })
            }
        }

    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}

exports.getaUserdetailbydateAndUserid = async (req, res) => {
    try {
        const { date, userid } = req.body
        console.log(date, userid)
        let data = null
        const userModeldata = await userDataModel.findOne({ date: date, userid: userid })
        if (date) {
            data = await userdetailmodel.find({
                date: date,
                userid: userid
            }).populate('userid')
            if (data.length) {
                res.status(201).json({ data: data, mesage: "successfull", code: 201, userData: userModeldata })
            } else {
                res.status(201).json({ data: data, mesage: "no data Found", code: 201, userData: userModeldata })
            }
        } else {
            data = await userdetailmodel.find({ userid: userid }).sort({ createdAt: -1 }).populate('userid')
            if (data.length) {
                res.status(201).json({ data: data, mesage: "successfull", code: 201, userData: userModeldata })
            } else {
                res.status(201).json({ data: data, mesage: "no data Found", code: 201, userData: userModeldata })
            }
        }

    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}