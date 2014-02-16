module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        nodeunit: {
            all: ['tests/*.js']
        },

        eslint: {
            options: {
                config: 'eslint.json'
            },
            target: [
                'src/**/*.js',
                'test/**/*.js'
            ]
        },

        istanbulNodeunit: {
            all: {
                foo: 'bar'
            }
        }
    });

    var tasks = ['eslint', 'istanbulNodeunit'];

    grunt.registerTask('default', tasks);
    grunt.registerTask('test', tasks);

    require('./tasks/istanbul-nodeunit')(grunt, {
        statement: 99,
        branch: 96,
        function: 99,
        lines: 99
    });
};