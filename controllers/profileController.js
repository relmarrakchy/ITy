let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()

let profile_get = async (req, res) => {
    let categories = articles = ""
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
            }

            console.log(articles)
            res.render("profile", {active: "profile", categories: categories, articles: articles, article: ""})
        })
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {profile_get}