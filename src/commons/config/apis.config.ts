import { registerAs } from '@nestjs/config';

export default registerAs('apis', () => ({
  GOOGLE_MAPS: {
    BASE_URL: process.env.GOOGLE_MAPS_URL || 'https://places.googleapis.com/v1',
    API_KEY: process.env.GOOGLE_MAP_KEY,
  },
}));
