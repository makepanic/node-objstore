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
                'src/**/*.js'
            ]
        }
    });

    var tasks = ['eslint', 'nodeunit'];

    grunt.registerTask('default', tasks);
    grunt.registerTask('test', tasks);

};