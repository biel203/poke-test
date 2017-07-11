describe('List', function () {

    before(function () {
        var server = require('../../../../app');
    })

    var PokemonCommand = require('../../../../server/command/pokemon/list');
    var chai = require('chai');
    var promise;

    it('List all registries', function (done) {
        var command = new PokemonCommand();
        var request = {
            body : {
                properties : {}
            }
        };
        var response = {};

        response.send = function (result) {
            chai.expect(result).to.be.an.instanceof(Array);
            done();
        };

        command.start(request, response);

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