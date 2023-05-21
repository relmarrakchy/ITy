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

                let artsPub = await prisma.article.count({
                    where: {
                        userID: encodedToken.id,
                        published: true
                    }
                })

                let artsPr = await prisma.article.count({
                    where: {
                        userID: encodedToken.id,
                        published: false
                    }
                })

                let articles = await prisma.article.findMany({
                    where: {
                        userID: encodedToken.id
                    },
                    include: {
                        commentaires: true
                    }
                })

                var sumComments = 0
                articles.forEach(art => {
                    sumComments += art.commentaires.length
                })

                res.locals.user = user
                res.locals.artsPub = artsPub
                res.locals.artsPr = artsPr
                res.locals.sumComments = sumComments
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }