const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const { setUser } = require("../utils/auth");
const prisma = new PrismaClient()


async function handleHomeGetReq(req, res) {
    return res.render("home", {user: req.user});
}



async function handleSignupGetReq(req, res) {
    if (req.cookies?.uid) {
        return res.render("home", {err: "already authenticated!", user: req.user})

    }
    return res.render("signup")
    
}

async function handleSignupPostReq(req, res) {
    const {username, email, password, role} = req.body

    let salt = crypto.randomBytes(8)

    const HMAC = crypto.createHmac('sha256', salt)
    const hashedPassword = HMAC.update(password).digest('hex')

    try {
        await prisma.users.create({
            data:{
                username, email, 
                password: hashedPassword,
                salt,
                role
            }
        })

        let token = setUser(user)
        res.cookie('uid', token)

        return res.redirect("/")
    } catch (error) {
        console.log('Failed to register your data', error)
    }
}



async function handleLoginGetReq(req, res) {
    if (req.cookies?.uid) {
        return res.render("home", {err: "already authenticated!", user: req.user})
    }
    return res.render("login", {user: req.user})
    
}

async function handleLoginPostReq(req, res) {
    const { email, password } = req.body
    
    try{
        let user = await prisma.users.findUnique({ where: { email } })

        const HMAC = crypto.createHmac('sha256', user.salt)
        const matchedPassword = HMAC.update(password).digest('hex')

        if (matchedPassword !== user.password) {
            return res.render('login', {err: "Incorrect Credentials"})

        }

        let token = setUser(user)
        res.cookie('uid', token)
        
        return res.redirect('/')
        
    }catch(err){
        console.log(err)
        return res.json({error: err.message})
    }
}


async function handleLogoutGetReq(req, res) {
    res.clearCookie('uid')
    return res.render('login', {err: "Logout Successful!"})
}



module.exports = 
{ 
    handleHomeGetReq,
    handleSignupGetReq,  handleSignupPostReq,
    handleLoginGetReq, handleLoginPostReq,
    handleLogoutGetReq,
}