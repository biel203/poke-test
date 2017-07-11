describe('Server', function() {
    describe('Router', function() {
        require('./server/router');
    });
    describe('Command', function() {

        describe('Pokemon', function () {
            require('./server/command/pokemon/create');
            require('./server/command/pokemon/update');
            require('./server/command/pokemon/delete');
            require('./server/command/pokemon/list');
            require('./server/command/pokemon/load');
            require('./server/command/pokemon/battle');
        })
    });
});