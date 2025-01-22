const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function handleExploreGetReq(req, res) {
    return res.render('explore', {user: req.user})
}

async function handleGetUploadAGame(req, res) {
    return res.render('uploads', {user: req.user})
}

async function handleUploadAGame(req, res) {
    const { gameName, gameDesc, 
        publisher, releaseDate, price,
        storyline, specification,
        genres1, genres2, genres3
    } = req.body

    let genres = [genres1, genres2, genres3]

    try {
        let gameData = await prisma.games.create({
            data:{ 
                gameName, gameDesc, 
                publisher, releaseDate: new Date(releaseDate), price: parseInt(price),
                storyline, specification,
                genres,
                coverImgUrl: req.file.path
            }
        })
    } catch (error) {
        console.log(error)
    }

    return res.redirect('/explore')
}

module.exports = {
    handleExploreGetReq,
    handleGetUploadAGame,
    handleUploadAGame
}