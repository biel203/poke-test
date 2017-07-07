class PokemonBattleCommand {
    constructor () {

    }

    start (req, res) {
        var orm,
            PokemonModel,
            battle,
            promise;

        try {
            orm = require("../../dao/model");
            PokemonModel = orm.model('gabriel');
            battle = require("../../util/whoWin");

            promise = PokemonModel.findAll(
                {
                    id : [req.params.idA, req.params.idB]
                }
            );
            promise.then(onFindAll.bind(this), onError);

        } catch (err) {
            res.send(new Error(err.message));
        }

        function onFindAll(result) {
            var battleResult,
            promises = [];

            try {
                if (result.length < 2) {
                    throw new Error("Não existem pokémon suficientes para uma batalha.");
                }

                battleResult = battle(result[0].dataValues, result[1].dataValues);

                promises.push(PokemonModel.update(
                    {
                        nivel : battleResult.winner.nivel + 1
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
                            nivel : battleResult.loser.nivel - 1
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
                res.json(err.message);
            }

            function onDonePromisses() {
                res.json(battleResult);
            }
        }

        function onError(err) {
            throw new Error(err.message);
        }

    }
}

module.exports = PokemonBattleCommand;