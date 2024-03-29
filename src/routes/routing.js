const express = require('express')
const { signupUser, getallusers } = require('../controllers/signupController')
const { userValidator } = require('../middleware/user')
const { getActivity, getfood, getmetvalue, getfoodnames, selectactivity } = require('../controllers/food')
const { userdetails, getalluserdetails, getaUserdetailbydateAndUserid, deleteuser } = require('../controllers/userDetailController')


const router = express.Router()

router.route('/signup').post(signupUser)
router.route('/getall-users').get(getallusers)
router.route('/getactivity').get(getActivity)
router.route('/getfood').get(getfood)
router.route('/getfoodname').get(getfoodnames)
router.route('/userdetial').post(userdetails)
router.route('/selectactivity').post(selectactivity)
router.route('/getuserdetails').get(getalluserdetails)
router.route('/getuserdetailbydata').post(getaUserdetailbydateAndUserid)
router.route('/delte').delete(deleteuser)



module.exports = router