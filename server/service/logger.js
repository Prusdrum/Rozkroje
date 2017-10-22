const winston = require('winston');
const path = require('path');

const getLogPath = (fileName) => path.join(__dirname, '..', 'logs', fileName);

const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ json: false, timestamp: true })
    ],
    exceptionHandlers: [
      new (winston.transports.Console)({ json: false, timestamp: true })
    ],
    exitOnError: false
  });
  
  module.exports = logger;