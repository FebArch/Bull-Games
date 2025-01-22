const { Router } = require("express");

const {restrictTo} = require('../middlewares/auth');
const { 
    handleHomeGetReq,
    handleSignupGetReq,  handleSignupPostReq,
    handleLoginGetReq, handleLoginPostReq,
    handleLogoutGetReq,
} = require("../controllers/root")


let router = Router()

router.route('/').get(handleHomeGetReq)

router.route('/signup').get(handleSignupGetReq).post(handleSignupPostReq)
router.route('/login').get(handleLoginGetReq).post(handleLoginPostReq)
router.route('/logout').get(restrictTo(['admin', 'user']), handleLogoutGetReq)

module.exports = router