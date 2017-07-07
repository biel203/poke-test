class PokemonLoadCommand {
    constructor () {

    }

    start (req, res) {
        var orm,
            PokemonModel,
            promise;

        try {
            orm = require("../../dao/model");
            PokemonModel = orm.model('gabriel');

            promise = PokemonModel.find(
                {
                    where : {
                        id : req.params.id
                    }
                }
            );
            promise.then(onFindAll.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        function onFindAll(result) {
            res.json(result);
        }

        function onError(err) {
            throw new Error(err.message);
        }

    }
}

module.exports = PokemonLoadCommand;