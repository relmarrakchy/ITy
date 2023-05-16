let jwt = require('jsonwebtoken')
let {PrismaClient} = require('@prisma/client')
let prisma = new PrismaClient()

let requireAuth = (req, res, next) => {
    let token = req.cookies.jwt

    if (token) {
        jwt.verify(token, "ity2023", (err, decodedToken) => {
            if (err) {
                res.status(301).render("login", {title: "Login"})
            }
            next()
        })
    } else {
        res.status(302).render("login", {title: "Login"})
    }
}

let checkUser = (req, res, next) => {
    let token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'ity2023', async (err, encodedToken) => {
            if (err) {
                res.locals.user = null
                next();
            } else {
                let user = await prisma.user.findUnique({
                    where: {
                        id: encodedToken.id
                    }
                })

                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }