describe('Update', function () {

    before(function () {
        var server = require('../../../../app');
    })

    var PokemonCommand = require('../../../../server/command/pokemon/update');
    var chai = require('chai');
    var promise;

    it('Update a registry', function (done) {
        var osr = require('../../../../server/dao/model');
        var model = osr.model('gabriel');

        promise = model.create({
            treinador : "GabrielTeste",
            tipo : "MEWTWO"
        });
        promise.then(onCreateTrainer.bind(this));

        function onCreateTrainer(result) {

            var trainerTest = result.dataValues;

            var command = new PokemonCommand();
            var request = {
                body : {
                    properties : {}
                }
            };
            var response = {};

            request.body.id = trainerTest.id;
            request.body.properties.trainer = "GabrielUPDATE";

            response.send = function (result) {
                chai.expect(result).to.be.an.instanceof(Array);
                chai.expect(result[0]).to.equal(1);
                done();
            };

            command.start(request, response);
        }

    });

    it('Try update type, but no update any registry', function (done) {
        var osr = require('../../../../server/dao/model');
        var model = osr.model('gabriel');

        promise = model.create({
            treinador : "GabrielTeste",
            tipo : "MEWTWO"
        });
        promise.then(onCreateTrainer.bind(this));

        function onCreateTrainer(result) {

            var trainerTest = result.dataValues;

            var command = new PokemonCommand();
            var request = {
                body : {
                    properties : {}
                }
            };
            var response = {};

            request.body.id = trainerTest.id;
            request.body.properties.type = "PIKACHU";

            response.send = function (result) {
                var promise;

                promise = model.findAll({
                    where : {
                        id : trainerTest.id
                    }
                });
                promise.then(onFind, onError);

                function onFind(result) {
                    chai.expect(result).to.be.an.instanceof(Array);
                    chai.expect(result[0]).to.have.property('dataValues');
                    chai.expect(result[0]).to.not.equal(request.body.properties.type);
                    chai.expect(result[0].dataValues.tipo).to.equal('MEWTWO');
                    done();
                }

                function onError(err) {
                    done(err.message);
                }

            };

            command.start(request, response);
        }

    });

    it('Try update registry, without ID', function (done) {
        var osr = require('../../../../server/dao/model');
        var model = osr.model('gabriel');

        promise = model.create({
            treinador : "GabrielTeste",
            tipo : "MEWTWO"
        });
        promise.then(onCreateTrainer.bind(this));

        function onCreateTrainer(result) {

            var trainerTest = result.dataValues;

            var command = new PokemonCommand();
            var request = {
                body : {
                    properties : {}
                }
            };
            var response = {};

            request.body.id = '';
            request.body.properties.trainer = "GabrielUPDATE";

            response.send = function (result) {
                chai.expect(result).to.be.an.instanceof(Error);
                chai.expect(result).to.have.property('message');
                chai.expect(result.message).to.be.a('string');
                chai.expect(result.message).to.equal('O ID é obrigatório para a atualização.');
                done()
            };

            command.start(request, response);
        }

    });

    afterEach(function() {
        var osr = require('../../../../server/dao/model');
        var model = osr.model('gabriel');

        model.destroy({
            where: {},
            truncate: true
        })
    });
});