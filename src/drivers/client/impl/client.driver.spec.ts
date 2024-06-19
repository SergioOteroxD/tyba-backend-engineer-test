import { Test, TestingModule } from '@nestjs/testing';
import { Repository, UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Clients } from '../model/client.model';
import { GeneralUtils } from '../../../commons/utils/general.util';
import { CustomException } from '../../../core/common/entity/custom-exception.model';
import { ClientsDriver } from './client.driver.impl';

describe('ClientsDriver', () => {
  let service: ClientsDriver;
  let repo: Repository<Clients>;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsDriver,
        {
          provide: getRepositoryToken(Clients),
          useClass: Repository,
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<ClientsDriver>(ClientsDriver);
    repo = module.get<Repository<Clients>>(getRepositoryToken(Clients));
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('register', () => {
    it('should register a new client', async () => {
      jest.spyOn(configService, 'get').mockImplementation((key: string) => {
        if (key === 'client.CLIENT_ID_LENGTH') return 10;
        if (key === 'client.CLIENT_ID_PREFIX') return 'C-';
        if (key === 'general.PEPPER_PASSWORD') return 'pepper';
        return null;
      });

      const generatedId = 'C-1234567890';
      jest.spyOn(GeneralUtils, 'generateId').mockReturnValue(generatedId);
      jest.spyOn(GeneralUtils, 'encryptPassword').mockResolvedValue('encryptedPassword');

      const clientData = {
        clientId: 'C-1',
        code: '234234',
        email: 'manuel@yahoo.com',
        name: 'manuel',
      };
      const savedClient = { ...clientData, clientId: generatedId, password: 'encryptedPassword' };
      jest.spyOn(repo, 'save').mockResolvedValue(savedClient);

      const result = await service.register(clientData);

      expect(result).toEqual(savedClient);
      expect(repo.save).toHaveBeenCalledWith(savedClient);
    });

    it('should throw CustomException on error', async () => {
      jest.spyOn(configService, 'get').mockReturnValue(10);
      const generatedId = 'C-1234567890';
      jest.spyOn(GeneralUtils, 'generateId').mockReturnValue('C-1234567890');
      jest.spyOn(GeneralUtils, 'encryptPassword').mockRejectedValue(new Error('Encryption failed'));
      const clientData = {
        clientId: 'C-1',
        code: '234234',
        email: 'manuel@yahoo.com',
        name: 'manuel',
      };
      const savedClient = { ...clientData, clientId: generatedId, password: 'encryptedPassword' };

      await expect(service.register(savedClient)).rejects.toThrow(CustomException);
    });
  });

  describe('getTotal', () => {
    it('should return total count of clients', async () => {
      const count = 5;
      jest.spyOn(repo, 'count').mockResolvedValue(count);

      const result = await service.getTotal({});

      expect(result).toBe(count);
    });
  });

  describe('getAll', () => {
    it('should return list of clients', async () => {
      const clients = [
        { clientId: 'C-1', name: 'Client1', password: 'password1', code: 'code1', email: 'client1@example.com' },
        { clientId: 'C-2', name: 'Client2', password: 'password2', code: 'code2', email: 'client2@example.com' },
      ];
      jest.spyOn(repo, 'find').mockResolvedValue(clients);

      const result = await service.getAll(1, 10, {}, {}, {});

      expect(result).toBe(clients);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const updateResult = { affected: 1 } as UpdateResult;
      jest.spyOn(repo, 'update').mockResolvedValue(updateResult);

      const result = await service.update('C-123', {});

      expect(result).toBe(updateResult);
    });

    it('should throw CustomException on error', async () => {
      jest.spyOn(repo, 'update').mockRejectedValue(new Error('Update failed'));

      await expect(service.update('C-123', {})).rejects.toThrow(CustomException);
    });
  });

  describe('getById', () => {
    it('should return a client by id', async () => {
      const client = { clientId: 'C-123' };
      jest.spyOn(repo, 'findOne').mockResolvedValue(client as Clients);

      const result = await service.getById('C-123', {}, {});

      expect(result).toBe(client);
    });
  });

  describe('getOne', () => {
    it('should return a client by filter', async () => {
      const client = { clientId: 'C-123' };
      jest.spyOn(repo, 'findOne').mockResolvedValue(client as Clients);

      const result = await service.getOne({ clientId: 'C-123' }, {}, {});

      expect(result).toBe(client);
    });
  });
});
