describe('Delete', function () {

    before(function () {
        var server = require('../../../../app');
    })

    var PokemonCommand = require('../../../../server/command/pokemon/delete');
    var chai = require('chai');
    var promise;

    it('Delete registry', function (done) {
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

            response.send = function (result) {
                chai.expect(result).to.equal(1);
                done();
            };

            command.start(request, response);
        }

    });

    it('Try delete registry without ID', function (done) {
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

            response.json = function (result) {
                chai.expect(result).to.be.an.instanceof(Error);
                chai.expect(result).to.have.property('message');
                chai.expect(result.message).to.be.a('string');
                chai.expect(result.message).to.equal('O ID é obrigatório para a exclusão.');
                done()
            };

            command.start(request, response);
        }

    });

    it('Try delete registry with wrong ID', function (done) {
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

            request.body.id = 131231231;

            response.send = function (result) {
                chai.expect(result).to.equal(0);
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