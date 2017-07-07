var orm = require("../model"),
    Seq = orm.Seq(),
    exports;

exports = {

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

function beforeCreate(model, options, cb) {
    model.set('nivel', 1);
}

module.exports = exports;