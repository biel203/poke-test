describe('Pokemon Route', function () {

    describe('GET /api/pokemon/', function () {

        var server = require('../../app');
        var request = require('request');
        var config = require('../../server/config.json');
        var chai = require('chai');

        it('Return success', function (done) {
            request.get(config.host.url + "api/pokemon/", function (err, res, body) {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(JSON.parse(body)).to.be.an.instanceof(Array);
                done();
            });
        });

        it('Request URL with wrong request method', function (done) {
            request.post(config.host.url + "api/pokemon/", function (err, res, body) {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(body).to.equal("Cannot POST /api/pokemon/\n");
                done();
            });
        });
    });

    describe('GET /api/pokemon/:id', function () {

        var server = require('../../app');
        var request = require('request');
        var config = require('../../server/config.json');
        var chai = require('chai');

        it('Return success', function (done) {
            var promise;
            var orm = require("../../server/dao/model");
            var PokemonModel = orm.model('gabriel');

            promise = PokemonModel.create({
                tipo : 'MEWTWO',
                trainer : "Gabriel"
            });

            promise.then(onCreate.bind(this));

            function onCreate(result) {
                request.get(config.host.url + "api/pokemon/" + result.dataValues.id, onRequest.bind(this));

                function onRequest (err, res, body) {
                    if (err) {
                        done(err.message);
                    }
                    chai.expect(res.statusCode).to.equal(200);
                    done();
                }
            }


        });

        it('Request wrong URL', function (done) {
            var promise;

            try {
                request.get(config.host.url + "api/pokemon//1", onRequest.bind(this));

                function onRequest(err, res, body) {
                    chai.expect(res.statusCode).to.equal(404);
                    chai.expect(body).to.equal("Cannot GET /api/pokemon//1\n");
                    done();
                }
            } catch (err) {
                console.log(err)
            }
        });

        it('Request URL with wrong request method', function (done) {
            request.post(config.host.url + "api/pokemon/1", function (err, res, body) {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(body).to.equal("Cannot POST /api/pokemon/1\n");
                done();
            });
        });
    });

    describe('POST /api/pokemon/create/', function () {

        var server = require('../../app');
        var request = require('request');
        var config = require('../../server/config.json');
        var chai = require('chai');

        it('Return success', function (done) {
            var parameters;

            parameters = {
                tipo : 'MEWTWO',
                treinador : "Gabriel"
            };

            request.post(config.host.url + "api/pokemon/create", parameters, onRequest.bind(this));

            function onRequest (err, res, body) {
                if (err) {
                    done(err.message);
                } else {
                    chai.expect(res.statusCode).to.equal(200);
                    done();
                }

            }
        });

        it('Request POST in a wrong ', function (done) {
            var parameters;

            parameters = {
                tipo : 'MEWTWO',
                trainer : "Gabriel"
            };

            request.post(config.host.url + "api/pokemon/sign-pokemon", parameters, onRequest.bind(this));

            function onRequest (err, res, body) {

                chai.expect(res.statusCode).to.equal(404);
                chai.expect(body).to.equal("Cannot POST /api/pokemon/sign-pokemon\n");
                done();
            }
        });
    });

    describe('POST /api/pokemon/update/', function () {

        var server = require('../../app');
        var request = require('request');
        var config = require('../../server/config.json');
        var chai = require('chai');

        it('Return success', function (done) {
            var parameters;

            parameters = {
                id : 1
            };

            request.post(config.host.url + "api/pokemon/create", parameters, onRequest.bind(this));

            function onRequest (err, res, body) {
                if (err) {
                    done(err.message);
                } else {
                    chai.expect(res.statusCode).to.equal(200);
                    done();
                }

            }
        });

    });

    describe('POST /api/pokemon/delete/', function () {

        var server = require('../../app');
        var request = require('request');
        var config = require('../../server/config.json');
        var chai = require('chai');

        it('Return success', function (done) {
            var parameters;

            parameters = {
                id : 1
            };

            request.post(config.host.url + "api/pokemon/delete", parameters, onRequest.bind(this));

            function onRequest (err, res, body) {
                if (err) {
                    done(err.message);
                } else {
                    chai.expect(res.statusCode).to.equal(200);
                    done();
                }

            }
        });
    });

    after(function() {
        var osr = require('../../server/dao/model');
        var model = osr.model('gabriel');

        model.destroy({
            where: {},
            truncate: true
        })
    });
});