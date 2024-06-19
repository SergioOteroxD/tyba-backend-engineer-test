import { IresponseBase } from '../../common/entity/response-base.model';
import { IuserContext } from '../../common/entity/user-context.interface';

export abstract class IupdateClientUC {
  abstract update(
    user: IuserContext,
    accountId: string,
    data: any,
  ): Promise<IresponseBase<any>>;
}
