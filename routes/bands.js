const express = require("express")
const { Band, Musician } = require("../models")

const bandRouter = express.Router()

bandRouter.get("/", async(req,res) => {
    const bands = await Band.findAll(
        {
            include: Musician
        }
    )
    res.json(bands)
})

bandRouter.get("/:id", async(req,res) => {
    const band = await Band.findByPk(req.params.id,
        {
            include: Musician
        }
    )
    res.json(band)
})

bandRouter.use(express.json())
bandRouter.use(express.urlencoded())

bandRouter.post("/", async(req,res) => {
    const band = await Band.create({
        name: req.body.name,
        genre: req.body.genre
    })
    res.json(band)
})

bandRouter.put("/:id", async(req,res) => {
    await Band.update({
        name: req.body.name,
        genre: req.body.genre
    },{
        where: {
            id: req.params.id
        }
    })
    const band = await Band.findByPk(req.params.id)
    res.json(band)
})

bandRouter.delete("/:id", async(req,res) => {
    await Band.destroy({
        where:{
            id: req.params.id
        }
    })
    res.send("Deleted successfully")
})

module.exports = bandRouter