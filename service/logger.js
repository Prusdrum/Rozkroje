const winston = require('winston');
const path = require('path');

const getLogPath = (fileName) => path.join(__dirname, '..', 'logs', fileName);

const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ json: false, timestamp: true }),
      new winston.transports.File({ name: 'debug',  filename: getLogPath('debug.log'), json: true, level: 'info' }),
      new winston.transports.File({ name: 'error',  filename: getLogPath('error.log'), json: true, level: 'error' })
    ],
    exceptionHandlers: [
      new (winston.transports.Console)({ json: false, timestamp: true }),
      new winston.transports.File({ filename: getLogPath('exceptions.log'), json: true })
    ],
    exitOnError: false
  });
  
  module.exports = logger;