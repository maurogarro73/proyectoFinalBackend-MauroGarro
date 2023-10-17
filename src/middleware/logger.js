import { devLogger, prodLogger } from '../utils/logger.utils.js';

export const addLogger = (req, res, next) => {
  const environment = process.env.NODE_ENV;
  if (environment === 'production') {
    req.logger = prodLogger;
    next();
  } else {
    req.logger = devLogger;
    next();
  }
};
