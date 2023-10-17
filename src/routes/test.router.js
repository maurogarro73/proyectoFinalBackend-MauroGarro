import express from 'express';

export const testLogger = express.Router();

testLogger.get('/', (req, res) => {
  try {
  } catch (error) {
    req.logger.error(error);
  }
  req.logger.debug('Debug');
  req.logger.http('HTTP');
  req.logger.info('reportando algo - Informacion');
  req.logger.warn('algo no tan malo ocurrio');
  req.logger.error('TODO MAL :(');

  res.send({ message: 'Hola mundo' });
});
