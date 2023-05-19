let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')
let fs = require('fs')

let prisma = new PrismaClient()

let getArticle = async (req, res) => {
    let categories = article = ""
    let artID = req.params.id
    try {
        await prisma.$connect()
        let token = req.cookies.jwt
        
        categories = await prisma.categorie.findMany()

        jwt.verify(token, 'ity2023', async (err, encodedToken) => {
            if(encodedToken) {
                article = await prisma.article.findUnique({
                    where: {
                        id: Number(artID)
                    },
                    include: {
                        categories: true,
                        commentaires: true,
                        author: true
                    }
                })
            }
            console.log(article)
            res.render("article", {active: "profile", categories: categories, article: article})
        })
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let addArticle = (req, res, next) => {
    let {published, category, title, content} = req.body
    let token = req.cookies.jwt
    let imgURL = ""

    if (req.file) imgURL = `./uploads/${req.file.filename}`

    console.log(published)

    
    if (category && title && content) {
        jwt.verify(token, "ity2023", async (err, encodedToken) => {
            if (encodedToken) {
                try {
                    await prisma.$connect()
            
                    let newArticle = await prisma.article.create({
                        data: {
                            titre: title,
                            contenu: content,
                            image: imgURL,
                            published: (published == 1) ? true : false,
                            userID: encodedToken.id
                        }
                    })

                    for (let i = 0; i < category.length; i++) {
                        await prisma.categorieArticle.create({
                            data: {
                                articleID: newArticle.id,
                                categorieID: Number(category[i])
                            }
                        })
                    }
                } catch(err) {
                    console.log(err)
                    res.json(err)
                } finally  {
                    await prisma.$disconnect()
                    res.redirect("/profile")
                }
            }
        })
    }
}

let deleteArticle = async (req, res) => {
    let key = req.params.id

    try {
        prisma.$connect()

        await prisma.commentaire.deleteMany({
            where: {
                articleID: Number(key)
            }
        })

        await prisma.categorieArticle.deleteMany({
            where: {
              articleID: Number(key),
            }
        })

        let img = await prisma.article.findUnique({
            where: {
                id: Number(key)
            },
            select: {
                image: true
            }
        })

        let imgPath = "../public" + img.image.slice(1)

        fs.unlink(imgPath, (err) => {
            console.log(err)
        })

        await prisma.article.delete({
            where: {
                id: Number(key)
            }
        })

        res.json({success: 1})
    } catch (err) {
        console.log(err)
        res.json(err)
    } finally {
        prisma.$disconnect()
    }
}

let existRecord = (idArt, idCat, data) => {
    data.forEach(item => {
        if (item.articleID === Number(idArt) && item.categorieID === Number(idCat)) return true
    })
}

let modifyArticle = (req, res) => {
    let {published, title, content, categories, img} = req.body
    let articleID = req.params.id
    let token = req.cookies.jwt

    console.log(categories)
    jwt.verify(token, 'ity2023', async (err, encodedToken) => {
        if (encodedToken) {
            let upArt = await prisma.article.update({
                where: {
                    id: Number(articleID)
                },
                data: {
                    published: (published) ? true : false,
                    titre: title,
                    contenu: content,
                    image: img,
                    userID: encodedToken.id
                }
            })

            if (upArt) {
                await prisma.categorieArticle.deleteMany({
                    where: {
                        articleID: Number(articleID)
                    }
                })

                for (let i = 0; i < categories.length; i++) {
                    await prisma.categorieArticle.create({
                        data: {
                            articleID: Number(articleID),
                            categorieID: Number(categories[i])
                        }
                    })
                }
            }

            res.json({success: 1})
        }
    })
}

module.exports = { getArticle, addArticle, deleteArticle, modifyArticle }