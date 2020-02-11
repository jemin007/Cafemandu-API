

const dotenv = require('dotenv');
dotenv.config;
const path = require("path");
const app = require('../index.js')
const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../connection/dbTest');
process.env.CAFE_NOV = 'test';

 let token ='';
 let id ='';

describe('Testing API all routes', () => {
    before(function(done) {
        this.timeout(150000)
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

    //Login
    it('Pass, should get login token', (done) => {
        request(app).post('/login')
        .send({
            email:'raju@gmail.com',
            password:'raju123',           

        })
            .then((res) => {
                expect(res.statusCode).to.equal(200)
                // expect(res.body).to.contain.property('token');
                expect(res.body).to.contain.property('status', 'Login success!');
                expect(res.body).to.contain.property('token');
                token = `Bearer ${res.body.token}`;
                done();
            })
            .catch((err) => done(err));
    })

    it('Fail, sending empty email as login detail', (done) => {
        request(app).post('/signup').send({
            email:'',
            password:'jemin123', 
            })
            .then((res) => {
                expect(res.statusCode).to.equal(500)
//                expect(res.body).to.contain.property('status', 'User validation failed: fullName: Path `fullName` is required.')
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

    //contact
    it('Pass, fetch data to server', (done) => {
        request(app).post('/contacts')
            .send({
                email: "jemin@gmail.com",
                description: "contact me"
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            })
            .catch((err) => done(err));
    })

    // it('Fail, sending empty email', (done) => {
    //     request(app).post('/contacts').send({
    //         email:'',
    //         description:'contactt', 
    //         })
    //         .then((res) => {
    //             expect(res.statusCode).to.equal(500)
    //             done();
    //         })
    //         .catch((err) => done(err));
    // })

    it('Pass, Get contact details', (done) => {
        request(app).get('/contacts')
            // .set('Authorization', token)
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    })

    it('Fail, empty body', (done) => {
        request(app).get('/contacts')
            // .set('Authorization', 'dummytoken')
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    })

    //food
    it('Pass, posting food data', (done) => {
        request(app).post('/foods')
            .send({
                name: "pizza",
                price: "2232",
                image: ""
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                foodId = res.body.id
                done();
            })
            .catch((err) => done(err));
    })

    // it('Fail, passing empty value', (done) => {
    //         request(app).post('/foods').send({
    //             name:'',
    //             price:'121',
    //             image:'' 
    //             })
    //             .then((res) => {
    //                 expect(res.statusCode).to.equal(500)
    //                 done();
    //             })
    //             .catch((err) => done(err));
    //     })

    it('Pass, Get food details', (done) => {
            request(app).get('/foods')
                // .set('Authorization', token)
                .then((res) => {
                    const body = res.body;
                    // expect(body).to.contain.property('_id');
                    expect(body).to.not.be.empty;
                    done();
                })
                .catch((err) => done(err));
        })

        it('Fail, get empty values', (done) => {
            request(app).get('/foods')
                // .set('Authorization', 'dummytoken')
                .then((res) => {
                    const body = res.body;
                    expect(body).to.not.be.empty;
                    done();
                })
                .catch((err) => done(err));
        })

        // it('Pass, update food info', (done) => {
        //     // let foodId = res.body._id
        //     request(app).put('/foods/' + foodId)
            
        //         .set('Authorization', token)
        //         .send({
        //             name: "Food updated",
        //             price: "121",
        //             image: "image updated"
                    
        //         })
        //         .then((res) => {
        //             expect(res.statusCode).to.equal(200);
        //             expect(res.body).to.not.be.empty;
        //             done();
        //         })
        //         .catch((err) => done(err));
        // })

        it('OK, create new food and delete the same food', (done) => {
            request(app).post('/foods')
                .set('Authorization', token)
                .send({
                    name: "food name about to delete",
                    price: "111",
                    image: "food image about to delete",
                })
                .then((res) => {
                    let id = res.body._id
                    request(app).delete('/foods/' + id)
                        .set('Authorization', token)
                        .then((res) => {
                            expect(res.statusCode).to.equal(200);
                            //expect(res.body).to.contain.property('status', 'Location deleted successfully');
                            done();
                        })
                        .catch((err) => done(err));
                })
                .catch((err) => done(err));
        })
    });






