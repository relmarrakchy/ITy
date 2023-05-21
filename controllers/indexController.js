let {PrismaClient} = require('@prisma/client')
let prisma = new PrismaClient()
let jwt = require('jsonwebtoken')

let index_get = async (req, res) => {
    let categories = articles = ""
    let timing = []

    try {
        await prisma.$connect();

        categories = await prisma.categorie.findMany()
        let token = req.cookies.jwt

        jwt.verify(token, 'ity2023', async (err, encodedToken) => {
            if (encodedToken) {
                articles = await prisma.article.findMany({
                    where: {
                        userID: {
                            not: encodedToken.id
                        },
                        published: true
                    },
                    include: {
                        categories: true,
                        commentaires: true,
                        author: true
                    },
                    orderBy: {
                        id: "desc"
                    }
                })
            } else {
                articles = await prisma.article.findMany({
                    where: {
                        published: true
                    },
                    include: {
                        categories: true,
                        commentaires: true,
                        author: true
                    },
                    orderBy: {
                        id: "desc"
                    }
                })
            }

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
            res.render("index", {title: "Index", active: "index", categories: categories, articles: articles, article: "", timing: timing})
        })
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {index_get}