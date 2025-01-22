const jwt = require('jsonwebtoken')
const privateKey = 'Batman'

function setUser(payload) {
    return jwt.sign({
        username: payload.username,
        email: payload.email,
        role: payload.role,

    }, privateKey, { expiresIn: '60m' })
}

function getUser(uid) {
    try {
        return jwt.verify(uid, privateKey)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    setUser, getUser
}