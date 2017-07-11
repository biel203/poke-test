/**
 * Classe de listagem de Pokémon da base de dados.
 */
class PokemonListCommand {
    constructor () {

    }

    /**
     * Método responsável por listar todos os registro de pokémon da base de dados.
     * @param {Object} req Objeto de requisição.
     * @param {Object} res Objeto de resposta, acionado quando a tarefa estiver finalizada.
     */
    start (req, res) {
        var orm,
            PokemonModel,
            promise;

        try {
            orm = require("../../dao/model");
            PokemonModel = orm.model('gabriel');

            promise = PokemonModel.findAll();
            promise.then(onFindAll.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        /**
         * Função de callback, contendo todos os registros de pokémon do banco.
         * @function onCreateAll
         * @param {Array} result Array de objetos, contendo todos os registros de pokémon encontrado.
         * @ignore
         */
        function onFindAll(result) {
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

module.exports = PokemonListCommand;