import { IresponseBase } from '../../common/entity/response-base.model';

export abstract class IqueryRestaurantUC {
  abstract getAllNearBy(limit: number, _filter: any): Promise<IresponseBase>;
}
