import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CustomException } from '../../../core/common/entity/custom-exception.model';
import { RestaurantDriver } from './restaurant.driver.impl';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RestaurantDriver', () => {
  let service: RestaurantDriver;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantDriver,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'apis.GOOGLE_MAPS.BASE_URL':
                  return 'https://maps.googleapis.com';
                case 'apis.GOOGLE_MAPS.API_KEY':
                  return 'test-api-key';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RestaurantDriver>(RestaurantDriver);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('getNearby', () => {
    it('should return nearby restaurants data', async () => {
      const mockResponse = {
        status: 200,
        data: {
          results: [{ name: 'Restaurant 1' }, { name: 'Restaurant 2' }],
        },
      };
      mockedAxios.create.mockReturnThis();
      mockedAxios.post.mockResolvedValue(mockResponse);

      const limit = 2;
      const data = { latitude: 37.7749, longitude: -122.4194 };
      const result = await service.getNearby(limit, data);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/places:searchNearby',
        {
          includedTypes: ['restaurant'],
          maxResultCount: limit,
          locationRestriction: {
            circle: {
              center: {
                latitude: data.latitude,
                longitude: data.longitude,
              },
              radius: 500.0,
            },
          },
        },
        { headers: { 'X-Goog-Api-Key': 'test-api-key', 'X-Goog-FieldMask': 'places.displayName' } },
      );
    });

    it('should throw CustomException on error', async () => {
      const mockError = new Error('Request failed');
      mockedAxios.create.mockReturnThis();
      mockedAxios.post.mockRejectedValue(mockError);

      const limit = 2;
      const data = { latitude: 37.7749, longitude: -122.4194 };

      await expect(service.getNearby(limit, data)).rejects.toThrow(CustomException);
    });
  });
});
