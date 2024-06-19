import { Test, TestingModule } from '@nestjs/testing';
import { IclientDriver, Clients } from '../../../../drivers/client';
import { RESPONSE_CODE } from '../../../../commons/response-codes/general-codes';
import { ResponseBase, ResponseQuery } from '../../../common/entity/response-base.model';
import { QueryClientUC } from './query-client.uc.impl';

describe('QueryClientUC', () => {
  let service: QueryClientUC;
  let clientDriver: IclientDriver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryClientUC,
        {
          provide: IclientDriver,
          useValue: {
            getById: jest.fn(),
            getTotal: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QueryClientUC>(QueryClientUC);
    clientDriver = module.get<IclientDriver>(IclientDriver);
  });

  describe('getById', () => {
    it('should return NOT_FOUND if client does not exist', async () => {
      jest.spyOn(clientDriver, 'getById').mockResolvedValue(null);

      const result = await service.getById('non-existing-id');

      expect(result).toEqual(new ResponseBase(RESPONSE_CODE.NOT_FOUND));
      expect(clientDriver.getById).toHaveBeenCalledWith(
        'non-existing-id',
        {
          clientId: true,
          name: true,
          mobileNumber: true,
          email: true,
          status: true,
        },
        {},
      );
    });

    it('should return client data if client exists', async () => {
      const client = { clientId: '123', name: 'John Doe' };
      jest.spyOn(clientDriver, 'getById').mockResolvedValue(client as Clients);

      const result = await service.getById('123');

      expect(result).toEqual(new ResponseBase(RESPONSE_CODE.QUERY_OK, client));
      expect(clientDriver.getById).toHaveBeenCalledWith(
        '123',
        {
          clientId: true,
          name: true,
          mobileNumber: true,
          email: true,
          status: true,
        },
        {},
      );
    });
  });

  describe('getAll', () => {
    it('should return NOT_FOUND if no clients match the filter', async () => {
      jest.spyOn(clientDriver, 'getTotal').mockResolvedValue(0);

      const result = await service.getAll(1, 10, {});

      expect(result).toEqual(new ResponseBase(RESPONSE_CODE.NOT_FOUND));
      expect(clientDriver.getTotal).toHaveBeenCalledWith({ where: {} });
    });

    it('should return client data if clients match the filter', async () => {
      const total = 2;
      const clients = [
        { clientId: '123', name: 'John Doe' },
        { clientId: '456', name: 'Jane Doe' },
      ];
      jest.spyOn(clientDriver, 'getTotal').mockResolvedValue(total);
      jest.spyOn(clientDriver, 'getAll').mockResolvedValue(clients as Clients[]);

      const result = await service.getAll(1, 10, {});

      expect(result).toEqual(new ResponseQuery(RESPONSE_CODE.QUERY_OK, clients, 1, 10, total));
      expect(clientDriver.getTotal).toHaveBeenCalledWith({ where: {} });
      expect(clientDriver.getAll).toHaveBeenCalledWith(
        1,
        10,
        {},
        {
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
        {},
      );
    });

    it('should apply filters correctly', async () => {
      const total = 1;
      const clients = [{ clientId: '123', name: 'John Doe' }];
      const filter = { name: 'John Doe', status: 'active' };
      jest.spyOn(clientDriver, 'getTotal').mockResolvedValue(total);
      jest.spyOn(clientDriver, 'getAll').mockResolvedValue(clients as Clients[]);

      const result = await service.getAll(1, 10, filter);

      expect(result).toEqual(new ResponseQuery(RESPONSE_CODE.QUERY_OK, clients, 1, 10, total));
      expect(clientDriver.getTotal).toHaveBeenCalledWith({ where: filter });
      expect(clientDriver.getAll).toHaveBeenCalledWith(
        1,
        10,
        filter,
        {
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
        {},
      );
    });
  });
});
