import { IresponseBase } from '../../common/entity/response-base.model';

export abstract class IregisterClientUC {
  /**
   *
   * @param data
   */
  abstract create(data: any): Promise<IresponseBase<any>>;
}
