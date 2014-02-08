#!/bin/bash

#https://github.com/jsdoc3/jsdoc
# install jsdoc locally
npm install jsdoc@"<=3.3.0"

# build docs
node_modules/.bin/jsdoc src/wrapper.js src/storage.js -d docs