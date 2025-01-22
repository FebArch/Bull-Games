const multer = require("multer")
const path = require("path")
const fs = require("fs")
const crypto = require("crypto")


const createDirectoryIfNotExists = async (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      await fs.mkdirSync(dirPath, { recursive: true })  // Create directory if it doesn't exist
    }
  }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let directoryForImages = path.join(__dirname, '../public', req.body.gameName); // Using user_id for example
      createDirectoryIfNotExists(directoryForImages)

      cb(null, directoryForImages)
    },
    filename: function (req, file, cb) {
      const fn = crypto.randomBytes(8).toString("hex") + path.extname(file.originalname)
      cb(null, fn)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload