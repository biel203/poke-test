module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jsdoc : {
            dist : {
                src: ['server/**/*.js'],
                options: {
                    destination: 'doc',
                    recursive : true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['jsdoc']);

};