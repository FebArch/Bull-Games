const { Router } = require("express");
const upload = require("../utils/multer")
const {restrictTo} = require('../middlewares/auth')

const { handleExploreGetReq, handleGetUploadAGame, handleUploadAGame } = require("../controllers/explore")

let router = Router();

router.route('/').get(handleExploreGetReq)

router.route('/upload').get(restrictTo(['admin']), handleGetUploadAGame).post(upload.single('coverImg'), handleUploadAGame)

module.exports = router
