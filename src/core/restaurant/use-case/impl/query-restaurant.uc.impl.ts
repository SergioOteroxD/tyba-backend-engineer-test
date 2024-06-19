import { Injectable } from '@nestjs/common';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { IresponseBase, ResponseBase } from '../../../common/entity/response-base.model';
import { IqueryRestaurantUC } from '../query-restaurant.uc';
import { IrestaurantDriver } from '../../../../drivers/restaurant/restaurant.driver';

@Injectable()
export class QueryRestaurantUC implements IqueryRestaurantUC {
  constructor(private restaurantDriver: IrestaurantDriver) {}

  async getAllNearBy(limit: number, filter: any): Promise<IresponseBase> {
    const data = await this.restaurantDriver.getNearby(limit, filter);

    return new ResponseBase(RESPONSE_CODE.QUERY_OK, data);
  }
}
