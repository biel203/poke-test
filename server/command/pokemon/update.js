class PokemonUpdateCommand {
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
            params.properties =  req.body.properties;

            if (!params.id) {
                throw new Error("O ID é obrigatório para a atualização.");
            }

            promise = PokemonModel.update(
                {
                    treinador : params.properties.trainer
                },
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

module.exports = PokemonUpdateCommand;