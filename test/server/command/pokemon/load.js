describe('Delete', function () {

    before(function () {
        var server = require('../../../../app');
    })

    var PokemonCommand = require('../../../../server/command/pokemon/load');
    var chai = require('chai');
    var promise;

    it('Load registry', function (done) {
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
                params : {
                }
            };
            var response = {};

            request.params.id = trainerTest.id;

            response.send = function (result) {
                chai.expect(result).to.have.a.property('dataValues');
                chai.expect(result.dataValues).to.have.a.property('id');
                chai.expect(result.dataValues).to.have.a.property('treinador');
                chai.expect(result.dataValues).to.have.a.property('tipo');
                chai.expect(result.dataValues).to.have.a.property('nivel');
                chai.expect(result.dataValues.id).to.equal(trainerTest.id);
                done();
            };

            command.start(request, response);
        }

    });

    it('Try to load registry with unexistent ID', function (done) {
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
                params : {
                }
            };
            var response = {};

            request.params.id = 13212312;

            response.send = function (result) {
                chai.expect(result).to.be.null;
                done();
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