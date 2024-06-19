import { IresponseBase } from '../../common/entity/response-base.model';
import { IuserContext } from '../../common/entity/user-context.interface';

export abstract class IlogoutManagamentUC {
  /**
   *
   * @param data
   */
  abstract logout(data: IuserContext): Promise<IresponseBase<any>>;
}
