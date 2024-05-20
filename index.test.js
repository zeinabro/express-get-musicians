// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");
const supertest = require("supertest")
const { expect, describe, test} = require("@jest/globals")


describe('./musicians endpoint', () => {
    test("gets all musicians", async () => {
        const res = await request(app).get("/musicians")
        expect(res.statusCode).toBe(200)
    })




    
})