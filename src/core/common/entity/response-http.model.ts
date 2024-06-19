import { HttpStatus } from '@nestjs/common';
import { GeneralUtils } from '../../../commons/utils/general.util';
import { IresponseBase, ResponseBase } from './response-base.model';

export interface ImetaResponse {
  readonly traceId: string;
  readonly requestId?: string;
}

export interface IresponseHttp<T = any> extends IresponseBase<T> {
  meta: ImetaResponse;
  status: HttpStatus;
}

export class ResponseHttp implements IresponseHttp {
  code: string;
  message: string;
  status: HttpStatus;
  meta: ImetaResponse;

  constructor(
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    result: IresponseBase = new ResponseBase(),
  ) {
    this.meta = { traceId: GeneralUtils.getTraceId };
    this.status = status;
    this.result = result;
  }

  /**
   *
   */
  public set result(result: IresponseBase) {
    Object.assign(this, result);
  }
}
