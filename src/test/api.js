let chai = require('chai');
let chaiHttp = require('chai-http')
let server = require('../app');
let { connect: connectRedis, disconnect: disconnectRedis } = require('../database/redis');
const expect = chai.expect


chai.use(chaiHttp);

describe('GET /api/character/:number', function () {

    before(async () => {
        await connectRedis();
    });

    after(async () =>{
        await disconnectRedis();        
    });

    describe('should return 400 status, when',function(){
        it(':number is a string', function (done) {
            
            const myString = 'hello'
            chai.request(server)
                .get(`/api/character/${myString}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.status).to.equal(400);
                    done();
                });
        });
        it(':number is less than 1', function (done) {
            chai.request(server)
                .get('/api/character/0')
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    done();
                });
        });
        it(':number is greater than 10', function (done) {
            chai.request(server)
                .get('/api/character/11')
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    // res.should.have.status(400);
                    done();
                });
        });
        
    });
    describe('Should return 200 status, when',function(){
        it(':number is a number between 1 to 10', function (done) {
            chai.request(server)
                .get('/api/character/1')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    })
});