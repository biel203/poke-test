describe('Battle', function () {

    before(function () {
        var server = require('../../../../app');
    })

    var PokemonCommand = require('../../../../server/command/pokemon/battle');
    var chai = require('chai');
    var promises = [];

    it('Battle between two pokemon', function (done) {
        var osr = require('../../../../server/dao/model');
        var model = osr.model('gabriel');

        promises.push(model.create({
            treinador : "GabrielTeste",
            tipo : "MEWTWO"
        }));

        promises.push(model.create({
            treinador : "GabrielTeste2",
            tipo : "PIKACHU"
        }));


        Promise.all(promises).then(onCreateTrainer.bind(this));

        function onCreateTrainer(result) {
            var command = new PokemonCommand();
            var trainer1 = result[0];
            var trainer2 = result[1];
            var request = {
                params : {}
            };
            var response = {};

            request.params.idA = trainer1.dataValues.id;
            request.params.idB = trainer2.dataValues.id;

            response.send = function (result) {
                chai.expect(result).to.have.a.property('loser');
                chai.expect(result).to.have.a.property('winner');
                chai.expect(result.winner.nivel).to.equal(2);
                chai.expect(result.loser.nivel).to.equal(0);
                done();
            };

            command.start(request, response);
        }

    });

    it('try to battle between two pokemon without one ID', function (done) {
        var osr = require('../../../../server/dao/model');
        var model = osr.model('gabriel');

        promises.push(model.create({
            treinador : "GabrielTeste",
            tipo : "MEWTWO"
        }));

        promises.push(model.create({
            treinador : "GabrielTeste2",
            tipo : "PIKACHU"
        }));


        Promise.all(promises).then(onCreateTrainer.bind(this));

        function onCreateTrainer(result) {
            var command = new PokemonCommand();
            var trainer1 = result[0];
            var trainer2 = result[1];
            var request = {
                params : {}
            };
            var response = {};

            request.params.idA = trainer1.dataValues.id;

            response.send = function (result) {
                chai.expect(result).to.be.an.instanceof(Error);
                chai.expect(result).to.have.property('message');
                chai.expect(result.message).to.be.a('string');
                chai.expect(result.message).to.equal('Não existem pokémon suficientes para uma batalha.');
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