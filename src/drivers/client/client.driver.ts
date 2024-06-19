import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { Clients } from './model/client.model';
import { Iclient } from '../../core/client/entity/client.entity';

export abstract class IclientDriver {
  abstract register(data: Partial<Iclient>): Promise<Iclient>;

  abstract getTotal(filter: FindManyOptions<Clients>): Promise<number>;

  abstract getAll(
    page: number,
    limit: number,
    filter: FindOptionsWhere<Clients>,
    projection: FindOptionsSelect<Clients>,
    relations: FindOptionsRelations<Clients>,
  ): Promise<Clients[]>;

  abstract update(userId: string, data: any): Promise<UpdateResult>;

  abstract getById(
    userId: string,
    projection: FindOptionsSelect<Clients>,
    relations: FindOptionsRelations<Clients>,
  ): Promise<Clients>;

  abstract getOne(
    filter: FindOptionsWhere<Clients> | FindOptionsWhere<Clients>[],
    projection: FindOptionsSelect<Clients>,
    relations: FindOptionsRelations<Clients>,
  ): Promise<Clients>;
}
