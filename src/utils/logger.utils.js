import winston, { addColors, format } from 'winston';
const { combine, printf } = format;

const levelsCustom = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'magenta',
  },
};

addColors(levelsCustom.colors);

const myFormat = printf(({ level, message }) => {
  return `[${new Date().toLocaleTimeString()}] [${level}]: ${message}`;
});

export const logger = winston.createLogger({
  levels: levelsCustom.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: combine(format.colorize({ all: true }), myFormat),
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'warn',
      format: winston.format.simple(),
    }),
  ],
});

export const devLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

export const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'error',
      format: winston.format.simple(),
    }),
  ],
});
