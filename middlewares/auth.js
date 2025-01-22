const { getUser } = require("../utils/auth");


function checkForAuthentication(req, res, next) {

    const uid = req.cookies?.uid
    // console.log(uid)
    if (!uid) {
        req.user = null
        return next()
    }

    let user = getUser(uid);
    if (!user) {
        // return res.render('login', { err: "User Not found!" })
        req.user = null
        return next()
    }

    req.user = user
    return next()
}

function restrictTo(roles){
    return function (req, res, next){

        

        if (!req.user) {
            return res.render("login", {err: "Authentication required!!"})
        }
        

        if (!roles.includes(req.user.role)) {
            return res.render("home", {err: "Sorry! You are not an authorized user to access this page!", user:req.user})
        }
        next()
    }
}

module.exports = {
    checkForAuthentication, restrictTo
}