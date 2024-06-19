import { Injectable } from '@nestjs/common';
import { IresponseBase, ResponseBase } from '../../../common/entity/response-base.model';
import { CustomException } from '../../../common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { IjwtDriver } from '../../../../drivers/jwt/jwt.driver';
import { IgenerateAdminSessionUC } from '../generate-admin-session.uc';
import { IitemTableAdminSession } from '../../entity/operation/item-table-session.entity';
import { GeneralUtils } from '../../../../commons/utils/general.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateAdminSessionUC implements IgenerateAdminSessionUC {
  constructor(
    private jwtSDriver: IjwtDriver,
    private configService: ConfigService,
  ) {}
  async generate(data: IitemTableAdminSession): Promise<IresponseBase<any>> {
    try {
      const ID_LENGTH = this.configService.get('general.SESSION_ID_LENGTH');
      const ID_PREFIX = this.configService.get<string>('general.SESSION_ID_PREFIX');
      data.sessionId = GeneralUtils.generateId(ID_LENGTH, ID_PREFIX);
      const token = await this.jwtSDriver.sign({
        ...data,
      });
      return new ResponseBase(
        {
          code: 'OK',
          message: `Cuenta confirmada`,
          status: 200,
        },
        { access_data: token },
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(RESPONSE_CODE.ERROR, 'GenerateSessionUC.generate', 'Technical', error);
    }
  }
}
