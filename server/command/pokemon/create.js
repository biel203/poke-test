/**
 * Classe de registro de Pokémon na base de dados.
 */
class PokemonCreateCommand {
    constructor () {

    }

    /**
     * Método responsável por cadastrar um novo pokémon na base de dados.
     * @param {Object} req Objeto de requisição.
     * @param {String} req.body.trainer Parâmetro referente ao nome do treinador.
     * @param {String} req.body.type Parâmetro referente ao tipo de pokémon.
     * @param {Object} res Objeto de resposta, acionado quando a tarefa estiver finalizada.
     */
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
                throw new Error("O parâmetro tipo é obrigatório.");
            }

            promise = PokemonModel.create({
                treinador : params.trainer,
                tipo : params.type
            });

            promise.then(onCreateAll.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        /**
         * Função de callback, chamada após cadastrar o pokémon no banco.
         * @function onCreateAll
         * @param {Object} result Instância da model do banco contendo as informações do objeto salvo.
         * @ignore
         */
        function onCreateAll(result) {
            res.send(result);
        }

        /**
         * Função de callback chamada caso aconteça um erro durante algum processo de promessa.
         * @param {Object} err Instância de erro.
         * @ignore
         */
        function onError(err) {
            res.send(new Error(err.message))
        }

    }

}

module.exports = PokemonCreateCommand;