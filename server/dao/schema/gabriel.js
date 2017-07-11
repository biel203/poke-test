var orm = require("../model"),
    Seq = orm.Seq();

/**
 * Schema para Pokemon
 * @example
 *  model : {
 *      treinador : Seq.STRING,
 *
 *      tipo : {
 *          type : Seq.ENUM,
 *          values : ["CHARIZARD", "MEWTWO", "PIKACHU"]
 *      },
 *
 *      nivel : Seq.INTEGER
 *  },
 *
 *  options: {
 *      timestamp: false,
 *      hooks : {
 *          beforeCreate : beforeCreate
 *      }
 *  }
 * @module PokemonSchema
 *
 */
var exports = {

    model : {
        treinador : Seq.STRING,

        tipo : {
            type : Seq.ENUM,
            values : ["CHARIZARD", "MEWTWO", "PIKACHU"]
        },

        nivel : Seq.INTEGER
    },
    
    options: {
        timestamp: false,
        hooks : {
            beforeCreate : beforeCreate
        }
    },

};

function beforeCreate(model, options) {
    model.set('nivel', 1);
}



module.exports = exports;