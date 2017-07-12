'use strict';

app.controller('home.controller', function ($scope, $rootScope) {

    $scope.pokemonList = [];
    $scope.registry = false;
    $scope.pokemonSelected = null;
    $scope.params = {};

    getPokemonList();

    function getPokemonList() {
        $.get('/api/pokemon', onGetPokemon);

        function onGetPokemon(result) {
            $scope.$apply(function () {
                $scope.pokemonList = result;
            })
        }
    }

    // MÉTODOS

    $scope.onRegistry = function (params) {
        var promise,
        data;
        function onRequest(result) {
            $scope.$apply(function () {
                if (!result.length) {
                    $scope.pokemonSelected = result;
                }
                $scope.registry = false;
                $scope.params = {};
                getPokemonList();
            })
        }

        function onError(err) {
            toastr.error(err)
        }

        if (params.id) {
            data = {
                id : params.id,
                properties : JSON.stringify({
                    trainer : params.trainer
                })
            };

            promise = $.post('/api/pokemon/update/', data);
        } else {

            promise = $.post('/api/pokemon/create/', params);
        }

        promise.then(onRequest.bind(this), onError);


    };

    $scope.onChoosePokemon = function (params) {
        $scope.pokemonSelected = params
    };

    $scope.onDelete = function (id) {
        $.post('/api/pokemon/delete', {id : id}, onDeletePokemon);

        function onDeletePokemon() {
                toastr.success("Pokemon deletado!");
                getPokemonList();
        }
    };

    $scope.onUpdate = function (params) {
        $scope.params.id = params.id;
        $scope.params.trainer = params.treinador;
        $scope.params.type = params.tipo;
        $scope.registry = true;
    };

    $scope.onBattle = function (id) {

        if (!$scope.pokemonSelected) {
            toastr.error('Use um pokemon para batalhar');
        }

        $.post('/api/pokemon/battle/'+ $scope.pokemonSelected.id + '/' + id, onGetPokemon);

        function onGetPokemon(result) {
            $scope.$apply(function () {
                $scope.battleStatus = result;
                getPokemonList();
            })
        }
    };
});
