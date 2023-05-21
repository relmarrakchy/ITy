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
                            published: Boolean(published),
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

    jwt.verify(token, 'ity2023', async (err, encodedToken) => {
        if (encodedToken) {
            let upArt = await prisma.article.update({
                where: {
                    id: Number(articleID)
                },
                data: {
                    published: (published == "false") ? false : true,
                    titre: title,
                    contenu: content,
                    image: img,
                    userID: encodedToken.id
                }
            })

            console.log(upArt.published)

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

let searchArticles = (req, res) => {
    let {category} = req.body
    let token = req.cookies.jwt

    jwt.verify(token, 'ity2023', async (err, encodedToken) => {
        if (encodedToken) {
            try {
                let categories = await prisma.categorie.findMany({
                    where: {
                        nom: {
                            contains: category
                        }
                    },
                    include: {
                        articles: true
                    }
                })

                var data = []
                var timing = []
                await Promise.all(categories.map(async (cat) => {
                    await Promise.all(cat.articles.map(async (art) => {
                        const article = await prisma.article.findUnique({
                            where: {
                                id: Number(art.articleID),
                            },
                            include: {
                                categories: true,
                                author: true,
                                commentaires: true
                            }
                    });
                  
                    if (article.userID !== encodedToken.id && article.published == 1) {
                        let update = article.updatedAt
                        let now = new Date()
            
                        let timeDiff = now - update
            
                        var time = {
                            days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
                            hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                            mins: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
                            secs: Math.floor((timeDiff % (1000 * 60)) / 1000)
                        }
            
                        timing.push(time)
                        data.push(article);
                    }
                    }))
                }))

                let response = {
                    categories: categories,
                    data: data,
                    timing: timing
                }
                
                res.json(response)
            } catch (err) {

            } finally {
                
            }
        }
    })
}

module.exports = { getArticle, addArticle, deleteArticle, modifyArticle, searchArticles }