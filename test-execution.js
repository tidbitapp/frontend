const fs = require('fs');
const path = require('path');
const httpServer = require('./node_modules/node-http-server/server/Server');
const daemon = require('daemon');
const Mocha = require('mocha');

const TEST_DIR = './test';

const mocha = new Mocha({
  timeout: '10000'
});

fs
  .readdirSync(TEST_DIR)
  .filter((file) => file.substr(-3) === '.js')
  .forEach((file) => mocha.addFile(path.join(TEST_DIR, file)));

httpServer
  .deploy({
    port: 8080,
    root: './'
  });
mocha
  .run((failure) => {
    process.exit();
    process.on('exit', () => {
      process.exit(failure);
    });
  });
