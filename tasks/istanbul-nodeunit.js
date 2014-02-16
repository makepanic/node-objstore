var shell = require('shelljs');



var TEST_FILES = shell.find("tests/").filter(fileType("js")),
    NODE = 'node',
    NODE_MODULES = 'node_modules/',
    ISTANBUL_CLI = NODE_MODULES + 'istanbul/lib/cli',
    NODEUNIT_CLI = NODE_MODULES + 'nodeunit/bin/nodeunit';

/**
 * Generates a function that matches files with a particular extension.
 * @param {string} extension The file extension (i.e. "js")
 * @returns {Function} The function to pass into a filter method.
 * @private
 */
function fileType(extension) {
    return function(filename) {
        return filename.substring(filename.lastIndexOf(".") + 1) === extension;
    };
}


module.exports = function(grunt, cfg) {
    grunt.registerMultiTask('istanbulNodeunit', 'My "foo" task.', function(){
        shell.exec([NODE, ISTANBUL_CLI, 'cover', NODEUNIT_CLI, '--', TEST_FILES.join(' ')].join(' '));
        shell.exec([NODE, ISTANBUL_CLI, 'check-coverage', "--statement " + cfg.statement + " --branch " + cfg.branch + " --function " + cfg.function + " --lines " + cfg.lines].join(' '));
    });
};