let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()

let profile_get = async (req, res) => {
    let categories = articles = ""
    let timing = []
    try {
        await prisma.$connect()
        let token = req.cookies.jwt
        
        categories = await prisma.categorie.findMany()

        jwt.verify(token, 'ity2023', async (err, encodedToken) => {
            if(encodedToken) {
                articles = await prisma.article.findMany({
                    where: {
                        userID: encodedToken.id
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    include: {
                        categories: true,
                        commentaires: true
                    }
                })

                articles.forEach(art => {
                    let update = art.updatedAt
                    let now = new Date()

                    let timeDiff = now - update

                    var data = {
                        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        mins: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
                        secs: Math.floor((timeDiff % (1000 * 60)) / 1000)
                    }

                    timing.push(data)
                });
            }
            res.render("profile", {active: "profile", categories: categories, articles: articles, article: "", friend: "", timing: timing})
        })
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let get_profile = async (req, res) => {
    let friendID = req.params.id
    let categories = articles = friend = ""
    let timing = []

    try {
        await prisma.$connect()

        categories = await prisma.categorie.findMany()

        friend = await prisma.user.findUnique({
            where: {
                id: Number(friendID)
            }
        })

        articles = await prisma.article.findMany({
            where: {
                userID: Number(friendID)
            },
            orderBy: {
                id: "desc"
            },
            include: {
                categories: true,
                commentaires: true
            }
        })

        articles.forEach(art => {
            let update = art.updatedAt
            let now = new Date()

            let timeDiff = now - update

            var data = {
                days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                mins: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
                secs: Math.floor((timeDiff % (1000 * 60)) / 1000)
            }

            timing.push(data)
        });

        res.render("profile", {active: "index", categories: categories, articles: articles, article: "", friend: friend, timing: timing})
    } catch(err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {profile_get, get_profile}