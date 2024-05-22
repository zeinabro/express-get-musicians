const express = require("express")
const Musician = require("../models/Musician")
const { check, validationResult } = require("express-validator")

const musicianRouter = express.Router()

musicianRouter.get("/", async(req,res) => {
    const musicians = await Musician.findAll()
    res.json(musicians)
})

musicianRouter.get("/:id", async(req,res) => {
    const musician = await Musician.findByPk(req.params.id)
    res.json(musician)
})

musicianRouter.use(express.json())
musicianRouter.use(express.urlencoded())

const validator = [
    check("name").trim().not().isEmpty(),
    check("instrument").trim().not().isEmpty()
]

musicianRouter.post("/", validator, async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
    } else {
        const musician = await Musician.create({
            name: req.body.name,
            instrument: req.body.instrument
        })
        res.json(musician)
    }

})

musicianRouter.put("/:id", async(req,res) => {
    await Musician.update({
        name: req.body.name,
        instrument: req.body.instrument
    },{
        where: {
            id: req.params.id
        }
    })
    const musician = await Musician.findByPk(req.params.id)
    res.json(musician)
})

musicianRouter.delete("/:id", async(req,res) => {
    await Musician.destroy({
        where:{
            id: req.params.id
        }
    })
    res.send("Deleted successfully")
})

module.exports = musicianRouter