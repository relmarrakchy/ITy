let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')

let prisma = new PrismaClient()

let addArticle = (req, res, next) => {
    let {published, category, title, content} = req.body
    let token = req.cookies.jwt
    let imgURL = ""

    if (req.file) imgURL = `./uploads/${req.file.filename}`
    console.log(req.file)

    // jwt.verify(token, "ity2023", async (err, encodedToken) => {
    //     if (encodedToken) {
    //         try {
    //             await prisma.$connect()
        
    //             let newArticle = await prisma.article.create({
    //                 data: {
    //                     titre: title,
    //                     contenu: content,
    //                     image: imgURL,
    //                     published: (published) ? true : false,
    //                     userID: encodedToken.id
    //                 }
    //             })

    //             await prisma.categorieArticle.create({
    //                 data: {
    //                     articleID: newArticle.id,
    //                     categorieID: Number(category)
    //                 }
    //             })
    //         } catch(err) {
    //             console.log(err)
    //             res.json(err)
    //         } finally  {
    //             await prisma.$disconnect()
    //             next();
    //         }
    //     }
    // })
}

module.exports = { addArticle }