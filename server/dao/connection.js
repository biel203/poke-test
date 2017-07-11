/**
 * Módulo de conexão com a base de dados.
 * @module connection
 */

/**
 * Estabelece a conexão com o banco de dados usando os parâmetros especificados em conf.json,.
 */
var connection = function  (dbName, username, password, options) {
    var model,
        config,
        schemaDir;

    try {
        config = require("../config.json");
        model = require("./model");

        schemaDir = __dirname + "/schema";

        // Configuração de conexão pelo helper singleton;
        model.setup(schemaDir,
            dbName || config.dbConfig.dbName,
            username || config.dbConfig.username,
            password || config.dbConfig.password,
            options || config.dbConfig.options );

    } catch (err){
        console.error(err);
    }
};

module.exports = connection;