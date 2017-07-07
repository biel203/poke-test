class PokemonCreateCommand {
    constructor () {

    }

    start (req, res) {
        var orm,
            PokemonModel,
            params,
            promise;

        try {
            orm = require("../../dao/model");
            PokemonModel = orm.model('gabriel');
            params = req.body;

            if (!params.trainer) {
                throw new Error("O nome do treinador é obrigatório.");
            }

            if (!params.type) {
                throw new Error("O tipo do treinador é obrigatório.");
            }

            promise = PokemonModel.create({
                treinador : params.trainer,
                tipo : params.type
            });

            promise.then(onCreateAll.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        function onCreateAll(result) {
            res.json(result);
        }

        function onError(err) {
            throw new Error(err.message);
        }

    }

}

module.exports = PokemonCreateCommand;