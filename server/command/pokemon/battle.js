/**
 * Classe command destinada a fazer as batalhas de pokemon.
 */
class PokemonBattleCommand {
    constructor () {

    }

    /**
     * Método responsável por iniciar a batalha entre dois pokémon.
     * @param {Object} req Objeto de requisição, contendo parâmetros para a batalha.
     * @param {Number} req.params.idA Parâmetro referente ao ID de um pokémon.
     * @param {Number} req.params.idB Parâmetro referente ao ID de um pokémon.
     * @param {Object} res Objeto de resposta, acionado quando a tarefa estiver finalizada.
     */
    start (req, res) {
        var orm,
            PokemonModel,
            battle,
            promise;

        try {
            orm = require("../../dao/model");
            PokemonModel = orm.model('gabriel');
            battle = require("../../util/whoWin");

            if (!req.params.idA || !req.params.idB) {
                throw new Error("Não existem pokémon suficientes para uma batalha.");
            }

            if (req.params.idA == req.params.idB) {
                throw new Error("O pokemon não pode batalhar com ele mesmo.");
            }

            promise = PokemonModel.findAll(
                {
                    where : {
                        id : [req.params.idA, req.params.idB]
                    }
                }
            );
            promise.then(onFindAll.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        /**
         * Função de callback chamada após uma busca no banco pelos IDs requeridos.
         * @function onFindAll.
         * @ignore
         * @param result
         */
        function onFindAll(result) {
            var battleResult,
            promises = [];

            try {

                battleResult = battle(result[0].dataValues, result[1].dataValues);

                battleResult.loser.nivel -= 1;
                battleResult.winner.nivel += 1;


                promises.push(PokemonModel.update(
                    {
                        nivel : battleResult.winner.nivel
                    },
                    {
                        where : {
                            id : battleResult.winner.id
                        }
                    }
                ));

                if (battleResult.loser.nivel === 0) {
                    promises.push(PokemonModel.destroy(
                        {
                            where : {
                                id : battleResult.loser.id
                            }
                        }));
                } else {
                    promises.push(PokemonModel.update(
                        {
                            nivel : battleResult.loser.nivel
                        },
                        {
                            where : {
                                id : battleResult.loser.id
                            }
                        }
                    ));
                }

                Promise.all(promises).then(onDonePromisses.bind(this), onError);
            } catch (err) {
                res.send(err.message);
            }

            /**
             * Função de callback, chamada após cadastrar os novos status dos pokémon no banco.
             * @function onDonePromisses
             * @ignore
             */
            function onDonePromisses() {
                res.send(battleResult);
            }
        }

        /**
         * Função de callback chamada caso aconteça um erro durante algum processo de promessa.
         * @param err
         */
        function onError(err) {
            throw new Error(err.message);
        }

    }
}

module.exports = PokemonBattleCommand;