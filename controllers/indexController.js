let {PrismaClient} = require('@prisma/client')
let prisma = new PrismaClient()
let jwt = require('jsonwebtoken')

let index_get = async (req, res) => {
    let categories = articles = ""
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
            console.log(articles)
            res.render("index", {title: "Index", active: "index", categories: categories, articles: articles, article: ""})
        })
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {index_get}