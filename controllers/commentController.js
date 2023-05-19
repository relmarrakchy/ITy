let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()

let comment_post = (req, res) => {
    let {content, idArticle} = req.body
    let token = req.cookies.jwt

    jwt.verify(token, 'ity2023', async (err, encodedToken) => {
        if (encodedToken) {
            try {
                await prisma.$connect()
                let user = await prisma.user.findUnique({
                    where: {
                        id: encodedToken.id
                    }
                })

                let comment = await prisma.commentaire.create({
                    data: {
                        article: { connect: { id: Number(idArticle) } },
                        email: user.email,
                        contenu: content
                    }
                })

                res.json({succes: 1})
            } catch (err) {
                res.json(err)
                console.log(err)
            } finally {
                await prisma.$disconnect()
            }
        }
    })
}

let comment_delete = async (req, res) => {
    let commentID = req.params.id

    try {
        prisma.$connect()

        await prisma.commentaire.delete({
            where: {
                id: Number(commentID)
            }
        })

        res.json({success: 1})
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let comment_mod = async (req, res) => {
    let commentID = req.params.id
    let {content} = req.body

    try {
        await prisma.$connect()

        await prisma.commentaire.update({
            where:{
                id: Number(commentID)
            },
            data: {
                contenu: content
            }
        })

        res.json({success: 1})
    } catch(err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {comment_post, comment_delete, comment_mod}