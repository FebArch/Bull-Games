
async function handleFAQGetReq(req, res) {
    return res.render('FAQ', {user: req.user})
}

async function handleAboutGetReq(req, res) {
    return res.render('about', {user: req.user})
}

module.exports = { handleFAQGetReq, handleAboutGetReq }