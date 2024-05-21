const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection");
const musicianRouter = require("../routes/musicians");

app.use("/musicians", musicianRouter)

module.exports = app;