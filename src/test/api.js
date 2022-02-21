let chai = require('chai');
let chaiHttp = require('chai-http')
let server = require('../app');
let { connect: connectRedis, disconnect: disconnectRedis } = require('../database/redis');
let should = chai.should();

chai.use(chaiHttp);

describe('GET /api/character/:number', function () {
    before(async () => {
        await connectRedis();
    })
    after(async () =>{
        await disconnectRedis();
    })

    describe(':number is a string', function () {
        it('should return a 400 status', function (done) {
            chai.request(server)
                .get('/api/character/error')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe(':number is less than 1', function () {
        it('should return a 400 status', function (done) {
            chai.request(server)
                .get('/api/character/0')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe(':number is greater than 10', function () {
        it('should return a 400 status', function (done) {
            chai.request(server)
                .get('/api/character/11')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe(':number is a number between 1 to 10', function () {
        it('should return a 200 status with an object', function (done) {
            chai.request(server)
                .get('/api/character/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done();
                });
        });
    });
});