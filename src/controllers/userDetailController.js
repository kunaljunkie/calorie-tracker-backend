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
        if (gender === 'Male') {
            BMR = 66.4730 + (13.7516 * userdata.Weight) + (5.0033 * userdata.Height) - (6.7550 * userdata.Age)
        } else if (gender === 'Female') {
            BMR = 655.0955 + (9.5634 * userdata.Weight) + (1.8496 * userdata.Height) - (4.6756 * userdata.Age)
        }
        const userPerDay = await userDataModel.findOne({ userid: userid, date: fooddata.date ? fooddata.date : activitydata.activityDate })
        let activityDutation = Number(activitydata.ActivityDuration) / 60
        if(!activitydata.ActivityDuration || activitydata.ActivityDuration == 'NaN'){
             activitydata.ActivityName = "----"
             activitydata.ActivityDescription = "----"
             activitydata.metvalue = 0
             activitydata.ActivityDuration = "----"
        }
        if (userPerDay) {
            let caloriein = 0
            if(fooddata.serving){
                caloriesin = food[0].Calories * Number(fooddata.serving)
                 caloriein = Number(caloriesin) + Number(userPerDay.caloriein)
            } else {
                caloriesin = userPerDay.caloriein
            }
            let calorieout = 0
            if(activityDutation || activityDutation =='NaN'){
                caloriesOutForActivities = activitydata.metvalue * userdata.Weight * activityDutation
                calorieout = Number(caloriesOutForActivities) + Number(userPerDay.calorieout ? userPerDay.calorieout : 0 )
            } else {
                calorieout = userPerDay.calorieout
            }
            let netcalorie = Number(caloriein) - Number(calorieout)
            await userDataModel.updateOne({ userid: userid }, {
                $set: {
                    caloriein: caloriein.toString(),
                    calorieout: calorieout.toString(),
                    netcalorie: netcalorie.toString(),
                    bmr: BMR,
                    date: userPerDay.date,
                    userid: userid
                }
            },
                { new: true })
        } else {
            caloriesin = food[0].Calories * Number(fooddata.serving)
            caloriesin ? caloriesin = caloriesin : caloriesin = 0
            caloriesOutForActivities = activitydata.metvalue * userdata.Weight * activityDutation
            caloriesOutForActivities ? caloriesOutForActivities = caloriesOutForActivities : caloriesOutForActivities = 0 
            netCaloriesPerDay = caloriesin - caloriesOutForActivities
            await userDataModel.create({
                caloriein: caloriesin,
                calorieout: caloriesOutForActivities,
                netcalorie: netCaloriesPerDay,
                bmr: BMR,
                userid: userid,
                date: fooddata.date ? fooddata.date : activitydata.activityDate})
            }
        let objectForinsert = {
            bmr: BMR,
            date: fooddata.date ? fooddata.date : activitydata.activityDate,
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

        let query = date ? { userid: userid, date: date } : { userid: userid }
        const data = await userDataModel.find(query).populate('userid')
        if (data.length) {
            res.status(201).json({ data: data, mesage: "successfull", code: 201 })
        } else {
            res.status(201).json({ data: data, mesage: "no data Found", code: 201 })
        }

    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}

exports.getaUserdetailbydateAndUserid = async (req, res) => {
    try {
        const { date, userid } = req.body
        let data = null
        let query = date ? { userid: userid, date: date } : { userid: userid }
        const userModeldata = await userDataModel.findOne({ date: date, userid: userid })
        data = await userdetailmodel.find(query).sort({ createdAt: -1 }).populate('userid')
        if (data.length) {
            res.status(201).json({ data: data, mesage: "successfull", code: 201, userData: userModeldata })
        } else {
            res.status(201).json({ data: data, mesage: "no data Found", code: 201, userData: userModeldata })
        }

    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}

exports.deleteuser = async (req, res) => {
    try {
        let { userid } = req.query
        const user = await usermodel.deleteOne({ _id: userid })
        if (user.deletedCount) {
            const check1 = await userDataModel.deleteMany({ userid: userid })
            const check2 = await userdetailmodel.deleteMany({ userid: userid })
            res.status(201).json({ mesage: "complete user data deleted successfull", code: 201 })
        }
        else {
            res.status(201).json({ mesage: "something went wrong", code: 201 })
        }
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}