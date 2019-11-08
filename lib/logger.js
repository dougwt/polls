const winston = require('winston');

const level = process.env.LOGGING_LEVEL || 'info';

const logger = winston.createLogger({
  level,
  transports: [new winston.transports.Console()]
});

module.exports = logger;
