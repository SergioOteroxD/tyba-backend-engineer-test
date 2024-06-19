import { registerAs } from '@nestjs/config';

export default registerAs('general', () => ({
  VERSION: process.env.VERSION || '1',
  LOG_LEVEL: process.env.LOG_LEVEL || 'DEBUG',

  SECRET_JWT: process.env.SECRET_JWT,
  EXPIRES_JWT: process.env.EXPIRES_JWT || '2d',

  SESSION_ID_LENGTH: process.env.SESSION_ID_LENGTH || '10',
  SESSION_ID_PREFIX: process.env.SESSION_ID_PREFIX || 'SE',

  PEPPER_PASSWORD: process.env.PEPPER_PASSWORD,
}));
