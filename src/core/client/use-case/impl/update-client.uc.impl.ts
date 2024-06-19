import { Injectable } from '@nestjs/common';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { IresponseBase, ResponseBase } from '../../../common/entity/response-base.model';
import { CustomException } from '../../../common/entity/custom-exception.model';
import { IupdateClientUC } from '../update-client.uc';
import { IuserContext } from '../../../common/entity/user-context.interface';
import { IclientDriver } from 'src/drivers/client';

@Injectable()
export class UpdateClientUC implements IupdateClientUC {
  constructor(private clientDriver: IclientDriver) {}
  async update(user: IuserContext, clientId: string, data: any): Promise<IresponseBase<any>> {
    try {
      const doc = await this.clientDriver.getOne([{ clientId }, { email: data?.email }, { name: data?.name }], {}, {});

      if (!doc)
        return new ResponseBase({
          code: 'CLI_CONFLICT',
          message: `Existe un conflicto`,
          status: 409,
        });

      await this.clientDriver.update(clientId, data);

      return new ResponseBase({
        code: 'CLI_UPDATE_OK',
        message: 'El cliente ha sido actualizado correctamente.',
        status: 200,
      });
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(RESPONSE_CODE.ERROR, 'UpdateAssociateUC.update', 'Technical', error);
    }
  }
}
