/**
 * Classe de atualização de um Pokémon na base de dados.
 */
class PokemonUpdateCommand {
    constructor () {

    }

    /**
     * Método responsável por atualizar um pokémon na base de dados.
     * @param {Object} req Objeto de requisição.
     * @param {String} req.body.id Parâmetro referente ao ID do pokémon.
     * @param {String} req.body.properties.trainer Parâmetro referente ao nome do treinador.
     * @param {Object} res Objeto de resposta, acionado quando a tarefa estiver finalizada.
     */
    start (req, res) {
        var orm,
            PokemonModel,
            params = {},
            promise;

        try {
            orm = require("../../dao/model");
            PokemonModel = orm.model('gabriel');
            params.id = req.body.id;

            if (typeof req.body.properties === 'string') {
                params.properties = JSON.parse(req.body.properties);
            }else {
                params.properties = req.body.properties;
            }

            if (!params.id) {
                throw new Error("O ID é obrigatório para a atualização.");
            }

            promise = PokemonModel.update(
                {
                    treinador : params.properties['trainer']
                },
                {
                    where : {
                        id : params.id
                    }
                });

            promise.then(onUpdate.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        /**
         * Função de callback, chamada após atualizar um pokémon no banco.
         * @function onUpdate
         * @param {Number} result Número de registros atualizados.
         * @ignore
         */
        function onUpdate(result) {
            res.send(result);
        }

        /**
         * Função de callback chamada caso aconteça um erro durante algum processo de promessa.
         * @param {Object} err Instância de erro.
         * @ignore
         */
        function onError(err) {
            throw new Error(err.message);
        }

    }

}

module.exports = PokemonUpdateCommand;