import { IresponseBase } from '../../common/entity/response-base.model';
import { IloginManagement } from '../entity/operation/login-management.entity';

export abstract class IloginManagamentUC {
  /**
   *
   * @param data
   */
  abstract login(data: IloginManagement): Promise<IresponseBase<any>>;
}
