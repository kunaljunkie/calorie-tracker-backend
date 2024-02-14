const food = require('../models/food')
const activitymodel = require('../models/activities')
exports.getfood = async (req, res) => {
    try {
        const data = await food.aggregate([
            {
                $group: {
                    _id: "$FoodGroup",
                }
            }
        ])
        res.status(200).json({ data: data })

    } catch (err) {
        res.status(200).json({
            error: err
        })
    }
}

exports.getfoodnames = async (req,res )=>{
    try {
        const {foodgroup} = req.query
        console.log(foodgroup)
        const data = await food.find({FoodGroup:foodgroup})
        res.status(200).json({ data: data })
    } catch  (err) {
        res.status(200).json({
            error: err.message
        })
    }
   

}
exports.getActivity = async (req, res) => {
    try {
        const data = await activitymodel.find()
        res.status(200).json({ data: data })


    } catch (err) {
        res.status(200).json({
            error:err.message
        })
    }
}

exports.selectactivity = async(req,res)=>{
    try {
        let {inputString,activity} = req.body
        const regex = new RegExp(inputString, 'i')
        const data = await activitymodel.find({specificMotion:regex,activity:activity})
        res.status(200).json({ data: data })
        
    } catch (err) {
         res.status(501).json({
            error:err.message
        })
    }
}

// exports.getmetvalue = async (req, res) => {
//     try {
//         const data = await activity.find({

//         })

//     } catch (err) {

//     }
// }

