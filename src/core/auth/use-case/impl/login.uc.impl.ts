import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IresponseBase, ResponseBase } from '../../../common/entity/response-base.model';
import { CustomException } from '../../../common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { IloginManagement } from '../../entity/operation/login-management.entity';
import { IloginManagamentUC } from '../login.uc';
import { IgenerateAdminSessionUC } from '../generate-admin-session.uc';
import { GeneralUtils } from '../../../../commons/utils/general.util';
import { IclientDriver } from '../../../../drivers/client';

@Injectable()
export class LoginManagementUC implements IloginManagamentUC {
  constructor(
    private clientDriver: IclientDriver,
    private config: ConfigService,
    private generateSessionUc: IgenerateAdminSessionUC,
  ) {}
  async login(data: IloginManagement): Promise<IresponseBase<any>> {
    try {
      const client = await this.clientDriver.getOne({ email: data.email }, {}, {});
      if (!client) {
        return new ResponseBase({
          code: 'NOT_FOUND',
          message: `La cuenta no ha sido encontrada`,
          status: 200,
        });
      }

      const match = await GeneralUtils.comparePassword(data.password, client.password, this.config.get<string>('general.PEPPER_PASSWORD'));

      if (!match) {
        return new ResponseBase({
          code: 'CONFLICT',
          message: `El usuario no esta activo`,
          status: 401,
        });
      }

      const responseGenerateSession = await this.generateSessionUc.generate({
        clientId: client.clientId,
      });
      if (responseGenerateSession.code != 'OK') return responseGenerateSession;

      return new ResponseBase(
        {
          code: 'LOGIN_OK',
          message: `Bienvenido a tu sistema de recolección de confianza`,
          status: 200,
        },
        responseGenerateSession.data,
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(RESPONSE_CODE.ERROR, 'ConfirmAccountUC.confirm', 'Technical', error);
    }
  }
}
