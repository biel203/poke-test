/**
 * Classe de carregamento de um Pokémon específico da base de dados.
 */
class PokemonLoadCommand {
    constructor () {

    }

    /**
     * Método responsável por listar um registro de pokémon específico na base de dados.
     * @param {Object} req Objeto de requisição.
     * @param {Number} req.params.id ID do pokémon a ser buscado.
     * @param {Object} res Objeto de resposta, acionado quando a tarefa estiver finalizada.
     */
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
            promise.then(onFound.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        /**
         * Função de callback, contendo o registro do pokémon do banco.
         * @function onFound
         * @param {Array} result Array de objetos, contendo o registro do pokémon encontrado.
         * @ignore
         */
        function onFound(result) {
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

module.exports = PokemonLoadCommand;