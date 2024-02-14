const winston = require('winston');
const logger = winston.createLogger({
  level: 'error', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `[${info.timestamp}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'app.log', level: 'error' })
  ]
});
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
  });
module.exports = logger;