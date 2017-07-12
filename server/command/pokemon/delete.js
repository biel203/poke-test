/**
 * Classe de exclusão de Pokémon na base de dados.
 */
class PokemonDeleteCommand {
    constructor () {

    }

    /**
     * Método responsável por deletar um registro de pokémon da base de dados.
     * @param {Object} req Objeto de requisição.
     * @param {Number} req.body.id Parâmetro referente ao ID de um pokémon.
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

            if (!params.id) {
                throw new Error("O ID é obrigatório para a exclusão.");
            }

            promise = PokemonModel.destroy(
                {
                    where : {
                        id : params.id
                    }
                });

            promise.then(onDelete.bind(this), onError);

        } catch (err) {
            res.json(new Error(err.message));
        }

        /**
         * Função de callback, chamada após deletar o pokémon no banco.
         * @function onDelete
         * @param {Number} result Número de registros deletados.
         * @ignore
         */
        function onDelete(result) {
            res.json(result);
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

module.exports = PokemonDeleteCommand;