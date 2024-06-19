import { IresponseBase } from '../../common/entity/response-base.model';
import { FindOptionsSelect } from 'typeorm';

export abstract class IqueryClientUC {
  abstract getById(value: string, projection?: FindOptionsSelect<any>, audience?: string): Promise<IresponseBase<any>>;

  abstract getAll(page: number, limit: number, _filter: any, projection: any): Promise<IresponseBase>;
}
