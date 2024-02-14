
const signupUser = require("../models/signup");
const userdetailmodel = require('../models/userdetails')
exports.signupUser = async (req, res) => {
  try{
    const {userdetails} = req.body
    if(userdetails){
      
      var today = new Date();
      var birthDate = new Date(userdetails.Age);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      userdetails.Age=age.toString();
      const data = await signupUser.create(userdetails)
      if(data){
        res.status(201).json({details:data,mesage:"successfull",code:201})
      } else 
      {
        res.status(201).json({details:data,mesage:"something went wrog",code:201})
      }
    }
  }catch(err){
    res.status(501).json({error: err})
  }
};

exports.getallusers = async(req,res)=>{
  try{
    const users = await signupUser.find()
    let userarra =[]
    if(users.length){
      for(let ele of users){
        ele=ele.toObject()
          const data = await userdetailmodel.findOne({userid:ele._id})
        if(data){
          ele.BMR = data.bmr
        }
        userarra.push(ele)
      }
      if(userarra.length){
        res.status(201).json({data:userarra,mesage:"fetched successfull",code:201})
      }
    } else {
      res.status(201).json({data:userarra,mesage:"No Data Found",code:201})
    }
    
  }catch(err){
    res.status(501).json({error: err}) 
  }
}
