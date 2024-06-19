import { Injectable } from '@nestjs/common';
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { IresponseBase, ResponseBase, ResponseQuery } from '../../../common/entity/response-base.model';
import { IqueryClientUC } from '../query-client.uc';
import { Clients, IclientDriver } from '../../../../drivers/client';

@Injectable()
export class QueryClientUC implements IqueryClientUC {
  constructor(private clientDriver: IclientDriver) {}

  async getById(
    value: string,
    projection: FindOptionsSelect<Clients> = {
      clientId: true,
      name: true,
      mobileNumber: true,
      email: true,
      status: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    audience?: string,
  ): Promise<IresponseBase<any>> {
    const doc = await this.clientDriver.getById(value, projection, {});
    if (!doc) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    return new ResponseBase(RESPONSE_CODE.QUERY_OK, doc);
  }

  async getAll(
    page: number,
    limit: number,
    _filter: any,
    projection: FindOptionsSelect<Clients> = {
      clientId: true,
      name: true,
      mobileNumber: true,
      email: true,
      status: true,
      code: true,
      location: {},
      createdAt: true,
      updateAt: true,
    },
  ): Promise<IresponseBase> {
    const filter: FindOptionsWhere<Clients> = {};
    if (_filter?.name) filter['name'] = _filter.name;
    if (_filter?.status) filter['status'] = _filter.status;

    const total: number = await this.clientDriver.getTotal({
      where: filter,
    });

    if (total == 0) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    const data = await this.clientDriver.getAll(page, limit, filter, projection, {});

    return new ResponseQuery(RESPONSE_CODE.QUERY_OK, data, page, limit, total);
  }
}
