class PokemonDeleteCommand {
    constructor () {

    }

    start (req, res) {
        var orm,
            PokemonModel,
            params = {},
            promise;

        try {
            orm = require("../../dao/model");
            PokemonModel = orm.model('gabriel');
            params.id = req.body.id;

            if (!params.id) {
                throw new Error("O ID é obrigatório para a exclusão.");
            }

            promise = PokemonModel.destroy(
                {
                    where : {
                        id : params.id
                    }
                });

            promise.then(onCreateAll.bind(this), onError);

        } catch (err) {
            res.json(new Error(err.message));
        }

        function onCreateAll(result) {
            res.json(result);
        }

        function onError(err) {
            throw new Error(err.message);
        }

    }

}

module.exports = PokemonDeleteCommand;