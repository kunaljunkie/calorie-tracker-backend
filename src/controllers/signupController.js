
const signupUser = require("../models/signup");
const userdetailmodel = require('../models/userdetails')
const userdataModel = require('../models/userdata');
const { MenBmr, WomenBmr } = require("../services/functions");
exports.signupUser = async (req, res) => {
  try {
    const { userdetails } = req.body
    if (userdetails) {
      var today = new Date();
      var birthDate = new Date(userdetails.Age);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      userdetails.Age = age.toString();
      
      let bmr = ""
      if (userdetails.Gender === 'Male') {
        bmr =  MenBmr(userdetails.Age, userdetails.Weight, userdetails.Height)
      } else if (userdetails.Gender === 'Female') {
        bmr =  WomenBmr(userdetails.Age, userdetails.Weight, userdetails.Height)
      }
      userdetails.bmr = bmr
      const data = await signupUser.create(userdetails)
      // let obj = { bmr: bmr, userid: data._id }
      // await userdataModel.create(obj)
      if (data) {
        res.status(201).json({ details: data, mesage: "successfull", code: 201 })
      } else {
        res.status(201).json({ details: data, mesage: "something went wrog", code: 201 })
      }
    }
  } catch (err) {
    res.status(501).json({ error: err.message })
  }
};

exports.getallusers = async (req, res) => {
  try {
    const users = await signupUser.find()
    let userarra = []
    if (users.length) {
      // for (let ele of users) {
      //   ele = ele.toObject()
      //   const data = await userdataModel.findOne({ userid: ele._id })
      //   if (data) {
      //     ele.BMR = data.bmr
      //   }
      //   userarra.push(ele)
      // }
      // if (userarra.length) {
        res.status(201).json({ data: users, mesage: "fetched successfull", code: 201 })
      // }
    } else {
      res.status(201).json({ data: users, mesage: "No Data Found", code: 201 })
    }
  } catch (err) {
    res.status(501).json({ error: err.message })
  }
}
