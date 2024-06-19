import { IresponseBase } from '../../common/entity/response-base.model';
import { IitemTableAdminSession } from '../entity/operation/item-table-session.entity';

export abstract class IgenerateAdminSessionUC {
  /**
   *
   * @param data
   */
  abstract generate(data: IitemTableAdminSession): Promise<IresponseBase<any>>;
}
