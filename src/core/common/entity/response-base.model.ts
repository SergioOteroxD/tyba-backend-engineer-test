import { HttpStatus } from '@nestjs/common/enums';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import { Ipaginator, Paginator } from './paginator.model';
import { IresponseCode } from './response-code.interface';

export interface IresponseBase<T = any> {
  code: string;
  message: string;
  status: HttpStatus;
  data?: T;
  pagination?: Ipaginator;
}

export class ResponseBase<T = any> implements IresponseBase<T> {
  public code: string;
  public message: string;
  public status: number;
  public data?: T;

  constructor(responseCode: IresponseCode = RESPONSE_CODE.ERROR, data?: T) {
    Object.assign(this, responseCode);
    this.data = data;
  }
}

export class ResponseQuery<T = any> implements IresponseBase<T> {
  public code: string;
  public message: string;
  public status: number;
  public pagination?: Ipaginator;

  constructor(
    responseCode: IresponseCode = RESPONSE_CODE.ERROR,
    public data: T,
    page: number,
    limit: number,
    total: number,
  ) {
    Object.assign(this, responseCode);
    this.pagination = new Paginator(total, page, limit);
  }
}
