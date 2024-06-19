import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { IrestaurantDriver } from '../restaurant.driver';
import { CustomException } from '../../../core/common/entity/custom-exception.model';

@Injectable()
export class RestaurantDriver implements IrestaurantDriver {
  private instance: AxiosInstance;
  constructor(private config: ConfigService) {
    this.instance = axios.create({ baseURL: this.config.get<string>('apis.GOOGLE_MAPS.BASE_URL') });
  }

  async getNearby(limit: number, data: any) {
    try {
      const result = await this.instance.post(
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
        { headers: { 'X-Goog-Api-Key': this.config.get<string>('apis.GOOGLE_MAPS.API_KEY'), 'X-Goog-FieldMask': 'places.displayName' } },
      );

      if (result.status != 200) {
      }
      return result.data;
    } catch (error) {
      Logger.log('ERROR', error?.message, 'RestaurantDriver.getNearby', {
        data: error,
        type: 'EXCEPTION',
        tags: 'API_GOOGLE_MAPS',
      });
      throw new CustomException({ code: 'TECH002', message: error?.message, status: 500 }, 'RestaurantDriver.getNearby', 'Technical', error);
    }
  }
}
