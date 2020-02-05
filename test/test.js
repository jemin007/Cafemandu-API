

const dotenv = require('dotenv');
dotenv.config;
const path = require("path");
const app = require('../index.js')
const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../connection/dbTest');
process.env.CAFE_NOV = 'test';

 let token ='';

describe('Testing API all routes', () => {
    before(function(done) {
        this.timeout(15000)
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });
    it('Pass, should get signup token', (done) => {
        request(app).post('/signup')
        .send({
            email:'raju@gmail.com',
            fullName:'Raju Chandra',
            password:'raju123',
            phone:'12121212',
            address:'Chabhel',
            image:''            

        })
            .then((res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.contain.property('token');
                token = `Bearer ${res.body.token}`;
                done();
            })
            .catch((err) => done(err));
    })


    it('Fail, sending empty name and password', (done) => {
        request(app).post('/signup').send({
            email:'raju@gmail.com',
            fullName:'',
            password:'',
            phone:'12121212',
            address:'Chabhel',
            image:'' 
            })
            .then((res) => {
                expect(res.statusCode).to.equal(500)
                expect(res.body).to.contain.property('status', 'User validation failed: fullName: Path `fullName` is required.')
                done();
            })
            .catch((err) => done(err));
    })

    it('Pass, Get user details', (done) => {
        request(app).get('/me')
            .set('Authorization', token)
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('email', 'raju@gmail.com');
                expect(body).to.contain.property('fullName', 'Raju Chandra');
                expect(body).to.contain.property('address', 'Chabhel');
                expect(body).to.contain.property('phone', '12121212');
                done();
            })
            .catch((err) => done(err));
    })

    it('Fail, provided dummy token', (done) => {
        request(app).get('/me')
            .set('Authorization', 'dummytoken')
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    })
});

