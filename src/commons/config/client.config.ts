import { registerAs } from '@nestjs/config';

export default registerAs('client', () => ({
  CLIENT_ID_LENGTH: process.env.CLIENT_ID_LENGTH || '10',
  CLIENT_ID_PREFIX: process.env.CLIENT_ID_PREFIX || 'CL',
}));
