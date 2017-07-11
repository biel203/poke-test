/**
 * Módulo de configurações de rotas para comunicação via RESTFull
 * @module router
 */

var express = require('express');
var router = express.Router();

// POKEMON -----------------------------------------------------

// Listar
var PokemonList = require('./command/pokemon/list');
var pokemonList = new PokemonList();

router.get('/api/pokemon/', pokemonList.start);

// Load
var PokemonLoad = require('./command/pokemon/load');
var pokemonLoad = new PokemonLoad();

router.get('/api/pokemon/:id', pokemonLoad.start);

// Criar
var PokemonCreate = require('./command/pokemon/create');
var pokemonCreate = new PokemonCreate();

router.post('/api/pokemon/create/', pokemonCreate.start);

// Atualizar
var PokemonUpdate = require('./command/pokemon/update');
var pokemonUpdate = new PokemonUpdate();

router.post('/api/pokemon/update/', pokemonUpdate.start);

// Delete
var PokemonDelete = require('./command/pokemon/delete');
var pokemonDelete = new PokemonDelete();

router.post('/api/pokemon/delete/', pokemonDelete.start);

// Battle
var PokemonBattle = require('./command/pokemon/battle');
var pokemonBattle = new PokemonBattle();

router.post('/api/pokemon/battle/:idA/:idB', pokemonBattle.start);

module.exports = router;
