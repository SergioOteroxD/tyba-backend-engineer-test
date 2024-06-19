import { Injectable, Logger } from '@nestjs/common';
import { FindManyOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '../../../core/common/entity/custom-exception.model';
import { GeneralUtils } from '../../../commons/utils/general.util';
import { Clients } from '../model/client.model';
import { IclientDriver } from '../client.driver';
import { Iclient } from '../../../core/client/entity/client.entity';

@Injectable()
export class ClientsDriver implements IclientDriver {
  constructor(
    @InjectRepository(Clients) private readonly usersRepo: Repository<Clients>,
    private configService: ConfigService,
  ) {}

  async register(data: Partial<Iclient>): Promise<Iclient> {
    try {
      const ID_LENGTH = this.configService.get('client.CLIENT_ID_LENGTH');
      const ID_PREFIX = this.configService.get<string>('client.CLIENT_ID_PREFIX');
      const clientId = GeneralUtils.generateId(ID_LENGTH, ID_PREFIX);
      data.clientId = clientId;

      data.password = await GeneralUtils.encryptPassword(data.password, this.configService.get<string>('general.PEPPER_PASSWORD'));
      return await this.usersRepo.save(data);
    } catch (error) {
      Logger.log('ERROR', error?.message, 'ClientsDriver.register', {
        data: error,
        type: 'EXCEPTION',
        tags: 'POSTGRES_DB',
      });
      throw new CustomException({ code: 'TECH001', message: error?.message, status: 500 }, 'ClientsDriver.register', 'Technical', error);
    }
  }

  async getTotal(filter: FindManyOptions<Clients>): Promise<number> {
    return this.usersRepo.count(filter);
  }

  async getAll(page: number, limit: number, filter: FindOptionsWhere<Clients>, projection: FindOptionsSelect<Clients> = {}, relations: FindOptionsRelations<Clients>): Promise<Clients[]> {
    return await this.usersRepo.find({
      where: filter,
      select: projection,
      skip: limit * (page - 1),
      take: limit,
      relations,
    });
  }

  async update(clientId: string, data: any): Promise<UpdateResult> {
    try {
      const result = await this.usersRepo.update({ clientId }, data);
      return result;
    } catch (error) {
      Logger.log('ERROR', error?.message, 'ClientsDriver.update', {
        data: error,
        type: 'EXCEPTION',
        tags: 'POSTGRES_DB',
      });
      throw new CustomException({ code: 'TECH002', message: error?.message, status: 500 }, 'ClientsDriver.update', 'Technical', error);
    }
  }

  async getById(clientId: string, projection: FindOptionsSelect<Clients>, relations: FindOptionsRelations<Clients>): Promise<Clients> {
    return this.usersRepo.findOne({
      where: { clientId },
      select: projection,
      relations,
    });
  }

  async getOne(filter: FindOptionsWhere<Clients> | FindOptionsWhere<Clients>[], projection: FindOptionsSelect<Clients>, relations: FindOptionsRelations<Clients>): Promise<Clients> {
    return this.usersRepo.findOne({
      where: filter,
      select: projection,
      relations,
    });
  }
}
