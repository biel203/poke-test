/**
 * Módulo singleton, responsável por carregar todos os schemas, deixar a instância disponível
 * para reuso, assim como todas as models de todos os schemas criados.
 *
 * @module model
 * @type {"fs"}
 */

var filesystem = require('fs');
var models = {};
var relationships = {};

/**
 * Classe singleton contendo todas as funcionalidades do módulo.
 * @class
 */
var Singleton = function singleton() {
    var Sequelize = require("sequelize");
    var sequelize = null;
    var modelsPath = "";
    var promise;

    /**
     * Método responsável em fazer a conexão literal com o banco de dados.
     *
     * @param {String} path caminho aonde estão localizados todos os schemas.
     * @param {String} database Nome do banco de dados que será utilizado.
     * @param {String} username Nome de usuário usado para logar no banco de dados.
     * @param {String} password Senha para logar no banco de dados.
     * @param {Object} obj Objeto com opções para configuração do banco.
     */
    this.setup = function (path, database, username, password, obj) {
        modelsPath = path;

        if(arguments.length == 3){
            sequelize = new Sequelize(database, username);
        }
        else if(arguments.length == 4){
            sequelize = new Sequelize(database, username, password);
        }
        else if(arguments.length == 5){
            sequelize = new Sequelize(database, username, password, obj);
        }

        if (sequelize) {
            promise = sequelize.authenticate();
            promise.then(onAuthenticate.bind(this), onError);
        }

        init();

        function onAuthenticate () {
            console.log("Database connected.");
        }

        function onError(err) {
            throw new Error(err.message || 'Database connection ERROR.');
        }
    };

    /**
     * Retorna a model requeria ao executar o método.
     * @param {String} name Nome do schema a ser solicitado (o nome do schema será o mesmo do arquivo js).
     * @returns {instance} Instância de model referente ao schema requisitado
     */
    this.model = function (name){
        return models[name];
    };

    /**
     * Retorna a classe Sequelize.
     * @returns {Sequelize}
     */
    this.Seq = function (){
        return Sequelize;
    };

    /**
     * Método responsável por percorrer cada arquivo de schema e cria-los.
     */
    function init() {
        filesystem.readdirSync(modelsPath).forEach(function(name){
            var object = require(modelsPath + "/" + name);
            var options = object.options || {};
            var modelName = name.replace(/\.js$/i, "");
            models[modelName] = sequelize.define(modelName, object.model, options);

            if("relations" in object){
                relationships[modelName] = object.relations;
            }

        });

        for(var name in relationships){
            var relation = relationships[name];
            for(var relName in relation){
                var related = relation[relName];

                models[name][relName](models[related]);
            }
        }
    }

    if(Singleton.caller != Singleton.getInstance){
        throw new Error("This object cannot be instanciated");
    }
};

Singleton.instance = null;

/**
 * Método estático responsável por retornar a instância da classe Singleton, garantindo
 * que a classe seja instanciada apenas uma vez.
 * @static
 * @returns {Singleton|singleton|null}
 */
Singleton.getInstance = function(){
    if(!this.instance){
        this.instance = new Singleton();
    }
    return this.instance;
};

module.exports = Singleton.getInstance();