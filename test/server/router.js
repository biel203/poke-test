describe('/api/pokemon/', function () {

    var server = require('../../app');
    var request = require('request');
    var config = require('../../server/config.json');

    it('Return success', function (done) {

        request.get("/api/pokemon/", function (err, res, body) {
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.be.an.instanceof(Array);
            done();
        });
    });
});