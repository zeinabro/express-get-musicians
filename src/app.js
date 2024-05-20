const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;


app.get("/musicians", async(req,res) => {
    const musicians = await Musician.findAll()
    res.json(musicians)
})

app.get("/musicians/:id", async(req,res) => {
    const musician = await Musician.findByPk(req.params.id)
    res.json(musician)
})

app.use(express.json())
app.use(express.urlencoded())

app.post("/musicians", async(req,res) => {
    const musician = await Musician.create({
        name: req.body.name,
        instrument: req.body.instrument
    })
    res.json(musician)
})

app.put("/musicians/:id", async(req,res) => {
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

app.delete("/musicians/:id", async(req,res) => {
    await Musician.destroy({
        where:{
            id: req.params.id
        }
    })
    res.send("Deleted successfully")
})



module.exports = app;