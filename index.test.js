// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
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

    test("creates new musician", async() => {
        const res = await request(app).post("/musicians").send({
            name: "Zeinab",
            instrument: "Piano"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("Zeinab")
    })

    test("updates musician by id", async() => {
        const res = await request(app).put("/musicians/4").send({
            name: "New Zeinab",
            instrument: "Piano" 
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual("New Zeinab")
    })

    test("deletes musician by id", async() => {
        const res = await request(app).delete("/musicians/4")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("Deleted successfully")
    })
    
})