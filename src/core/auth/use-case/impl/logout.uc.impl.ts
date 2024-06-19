import { Injectable } from '@nestjs/common';
import { IresponseBase, ResponseBase } from '../../../common/entity/response-base.model';
import { CustomException } from '../../../common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { IlogoutManagamentUC } from '../logout.uc';
import { IuserContext } from '../../../common/entity/user-context.interface';

@Injectable()
export class LogoutManagementUC implements IlogoutManagamentUC {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logout(data: IuserContext): Promise<IresponseBase<any>> {
    try {
      return new ResponseBase({
        code: 'LOGOUT_OK',
        message: `Salida correcta a tu sistema de recolección de confianza`,
        status: 200,
      });
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(RESPONSE_CODE.ERROR, 'LogoutManagementUC.logout', 'Technical', error);
    }
  }
}
