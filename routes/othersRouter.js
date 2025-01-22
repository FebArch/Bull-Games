const { Router } = require("express");

const { handleFAQGetReq, handleAboutGetReq } = require("../controllers/others")

let router = Router();

router.route('/faq').get(handleFAQGetReq)
router.route('/about').get(handleAboutGetReq)

module.exports = router
