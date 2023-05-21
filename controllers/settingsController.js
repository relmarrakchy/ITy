let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()
let bcrypt = require('bcrypt')

let get_Settings = async (req, res) => {
    let token = req.cookies.jwt
    let categories = articles = ""
    try {
        await prisma.$connect()
        categories = await prisma.categorie.findMany()
        jwt.verify(token, 'ity2023', async (err, encodedToken) => {
            if(encodedToken) {
                    articles = await prisma.article.findMany({
                    where: {
                        userID: encodedToken.id
                    }
                })
            }
            res.render("settings", {active: "settings", article: "", categories: categories, friend: "", articles: articles})
        })
    } catch(err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let post_settings = async (req, res) => {
    let {nom, email, password} = req.body

    try {
        await prisma.$connect()

            let token = req.cookies.jwt

            jwt.verify(token, 'ity2023', async (err, encodedToken) => {
                if (encodedToken) {
                    let currentUser = await prisma.user.findUnique({
                        where: {
                            id: encodedToken.id
                        }
                    })

                    let existingEmail = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })

                    if (email === currentUser.email || !existingEmail) {
                        let salt = await bcrypt.genSalt()
                        let hashPassword = await bcrypt.hashSync(password, salt)

                        let update = await prisma.user.update({
                            where: {
                                id: encodedToken.id
                            },
                            data: {
                                nom: nom,
                                email: email,
                                password: hashPassword,
                                role: "AUTHOR"
                            }
                        })

                        if (update) {
                            res.json({succes: 1})
                        }
                    } else {
                        res.json({errEmail: "This email is already used!"})
                    }
                }
            })
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let deleteUser = async (req, res) => {
    let {id} = req.params
    
    try {
        await prisma.$connect()

        let articles = await prisma.article.findMany({
            where: {
                userID: Number(id)
            },
        })

        articles.forEach(async art => {
            await prisma.commentaire.deleteMany({
                where: {
                    articleID: art.id
                }
            })

            await prisma.categorieArticle.deleteMany({
                where: {
                    articleID: art.id
                }
            })
        })

        let delArts = await prisma.article.deleteMany({
            where: {
                userID: Number(id)
            }
        })

        if (delArts) {
            let user = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })

            if (user) {
                res.cookie("jwt", '', {maxAge: 1})
                res.json({sucess: 1})
            }
        }
    } catch(err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = { get_Settings, post_settings, deleteUser }