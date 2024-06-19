import { HttpStatus, Injectable } from '@nestjs/common';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { IresponseBase, ResponseBase } from '../../../common/entity/response-base.model';
import { CustomException } from '../../../common/entity/custom-exception.model';
import { IregisterClientUC } from '../register-client.uc';
import { IclientDriver } from 'src/drivers/client';

@Injectable()
export class RegisterClientUC implements IregisterClientUC {
  constructor(private clientDriver: IclientDriver) {}
  async create(data: any): Promise<IresponseBase<any>> {
    try {
      const doc = await this.clientDriver.getOne([{ name: data.name }, { email: data.email }], undefined, undefined);

      if (doc) {
        return new ResponseBase({
          code: 'CLI_EXIST_CONFLICT',
          message: 'El cliente ya esta registrado en el sistema.',
          status: HttpStatus.CONFLICT,
        });
      }

      const client = await this.clientDriver.register(data);
      return new ResponseBase(
        {
          code: 'CLI_REG_OK',
          message: 'Cliente ha sido creado correctamente.',
          status: 201,
        },
        { collaboratorId: client.clientId },
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(RESPONSE_CODE.ERROR, 'RegisterClientUC.create', 'Technical', error);
    }
  }
}
