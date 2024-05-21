const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection");
const musicianRouter = require("../routes/musicians");
const bandRouter = require("../routes/bands");

app.use("/musicians", musicianRouter)
app.use("/bands", bandRouter)

module.exports = app;