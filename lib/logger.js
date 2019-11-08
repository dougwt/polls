const winston = require('winston');
const LogdnaWinston = require('logdna-winston');
const appConfig = require('./appConfig');

const level = process.env.LOGGING_LEVEL || 'info';

const logger = winston.createLogger({
  level,
  transports: [new winston.transports.Console()]
});

// If config contains a logdna key, add a logdna transport
if (appConfig.logdna.key) {
  logger.debug('Creating logdna transport');
  logger.add(new LogdnaWinston(appConfig.logdna));
}

module.exports = logger;
