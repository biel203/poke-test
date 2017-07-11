describe('Create', function () {

    var server = require('../../../../app');
    var PokemonCommand = require('../../../../server/command/pokemon/create');
    var chai = require('chai');

    it('Registry a new Pokemon', function (done) {
        var command = new PokemonCommand();
        var request = {
            body : {}
        };
        var response = {};

        request.body.trainer = "Gabriel Teste";
        request.body.type = "MEWTWO";

        response.send = function (result) {
            chai.expect(result).to.have.property('dataValues');
            chai.expect(result.dataValues).to.have.property('treinador');
            chai.expect(result.dataValues.treinador).to.equal(request.body.trainer);
            chai.expect(result.dataValues).to.have.property('tipo');
            chai.expect(result.dataValues.tipo).to.equal(request.body.type);
            done()
        };

        command.start(request, response);

    });

    it('Registration error, wrong type', function (done) {
        var command = new PokemonCommand();
        var request = {
            body : {}
        };
        var response = {};

        request.body.trainer = "Gabriel Teste";
        request.body.type = "BULBASSAURO";

        response.send = function (result) {
            chai.expect(result).to.be.an.instanceof(Error);
            chai.expect(result).to.have.property('message');
            chai.expect(result.message).to.be.a('string');
            chai.expect(result.message).to.include('conflict');
            done()
        };

        command.start(request, response);

    });

    it('Registration error, parameter "trainer" is missing"', function (done) {
        var command = new PokemonCommand();
        var request = {
            body : {}
        };
        var response = {};

        request.body.trainer = "";
        request.body.type = "MEWTWO";

        response.send = function (result) {
            chai.expect(result).to.be.an.instanceof(Error);
            chai.expect(result).to.have.property('message');
            chai.expect(result.message).to.be.a('string');
            chai.expect(result.message).to.equal('O nome do treinador é obrigatório.');
            done()
        };

        command.start(request, response);

    });

    it('Registration error, parameter "type" is missing"', function (done) {
        var command = new PokemonCommand();
        var request = {
            body : {}
        };
        var response = {};

        request.body.trainer = "Gabriel Teste";
        request.body.type = "";

        response.send = function (result) {
            chai.expect(result).to.be.an.instanceof(Error);
            chai.expect(result).to.have.property('message');
            chai.expect(result.message).to.be.a('string');
            chai.expect(result.message).to.equal('O parâmetro tipo é obrigatório.');
            done()
        };

        command.start(request, response);

    });

    after(function() {
        var osr = require('../../../../server/dao/model');
        var model = osr.model('gabriel');

        model.destroy({
            where: {},
            truncate: true
        })
    });
});