// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const { seedMusician, seedBand } = require("./seedData");
const supertest = require("supertest")
const { expect, describe, test} = require("@jest/globals")


describe('./musicians endpoint', () => {
    test("gets all musicians", async () => {
        const res = await request(app).get("/musicians")
        expect(res.statusCode).toBe(200)
        expect(res.body[1]).toEqual(expect.objectContaining(seedMusician[1]))
    })

    test("gets musician by id", async () => {
        const res = await request(app).get("/musicians/2")
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual((seedMusician[1]).name)
    })

    test("creates new musician with valid info", async() => {
        const res = await request(app).post("/musicians").send({
            name: "Zeinab",
            instrument: "Piano"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("Zeinab")
    })

    test("error when creating musician with empty info", async() => {
        const res = await request(app).post("/musicians").send({
            name: " ",
            instrument: " "
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.error[0]).toEqual({
            "type": "field",
            "value": "",
            "msg": "Invalid value",
            "path": "name",
            "location": "body"
        })
        expect(res.body.error[1]).toEqual({
            "type": "field",
            "value": "",
            "msg": "Invalid value",
            "path": "instrument",
            "location": "body"
        })
    })

    test("error when creating musician with invalid info", async() => {
        const res = await request(app).post("/musicians").send({
            name: "A super long name that is over 20 characters",
            instrument: "x"
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.error[0]).toEqual({
            "type": "field",
            "value": "A super long name that is over 20 characters",
            "msg": "Invalid value",
            "path": "name",
            "location": "body"
        })
        expect(res.body.error[1]).toEqual({
            "type": "field",
            "value": "x",
            "msg": "Invalid value",
            "path": "instrument",
            "location": "body"
        })
    })

    test("updates musician by id with valid info", async() => {
        const res = await request(app).put("/musicians/4").send({
            name: "New Zeinab",
            instrument: "Piano" 
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual("New Zeinab")
    })

    test("cannot update musician with invalid info", async() => {
        const res = await request(app).put("/musicians/4").send({
            name: "x",
            instrument: ""
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.error[1]).toEqual({
            "type": "field",
            "value": "x",
            "msg": "Invalid value",
            "path": "name",
            "location": "body"
        })
        expect(res.body.error[0]).toEqual({
            "type": "field",
            "value": "",
            "msg": "Invalid value",
            "path": "instrument",
            "location": "body"
        })
    })

    test("deletes musician by id", async() => {
        const res = await request(app).delete("/musicians/4")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("Deleted successfully")
    })
    
})

describe('./bands endpoint', () => {
    test("gets all bands", async () => {
        const res = await request(app).get("/bands")
        expect(res.statusCode).toBe(200)
        expect(res.body[1]).toEqual(expect.objectContaining(seedBand[1]))
    })

    test("gets band by id", async () => {
        const res = await request(app).get("/bands/2")
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual((seedBand[1]).name)
    })

    test("creates new band", async() => {
        const res = await request(app).post("/bands").send({
            name: "Zeinab's band",
            genre: "Rock"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("Zeinab's band")
    })

    test("updates band by id", async() => {
        const res = await request(app).put("/bands/4").send({
            name: "New Zeinab Band",
            genre: "Rock" 
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual("New Zeinab Band")
    })

    test("deletes band by id", async() => {
        const res = await request(app).delete("/bands/4")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("Deleted successfully")
    })
    
})