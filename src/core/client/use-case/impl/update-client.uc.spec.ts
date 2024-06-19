import { Test, TestingModule } from '@nestjs/testing';
import { IclientDriver } from 'src/drivers/client';
import { ResponseBase } from '../../../common/entity/response-base.model';
import { CustomException } from '../../../common/entity/custom-exception.model';
import { IuserContext } from '../../../common/entity/user-context.interface';
import { UpdateClientUC } from './update-client.uc.impl';

describe('UpdateClientUC', () => {
  let service: UpdateClientUC;
  let clientDriver: IclientDriver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientUC,
        {
          provide: IclientDriver,
          useValue: {
            getOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateClientUC>(UpdateClientUC);
    clientDriver = module.get<IclientDriver>(IclientDriver);
  });

  describe('update', () => {
    it('should return conflict if client does not exist', async () => {
      jest.spyOn(clientDriver, 'getOne').mockResolvedValue(null);

      const user: IuserContext = { accountId: 'user1', sessionId: 'dsf24', exp: 234, iat: 3245 };
      const clientId = 'non-existing-client';
      const data = { name: 'John Doe', email: 'john.doe@example.com' };

      const result = await service.update(user, clientId, data);

      expect(result).toEqual(
        new ResponseBase({
          code: 'CLI_CONFLICT',
          message: 'Existe un conflicto',
          status: 409,
        }),
      );
      expect(clientDriver.getOne).toHaveBeenCalledWith([{ clientId }, { email: data?.email }, { name: data?.name }], {}, {});
    });

    it('should update client if client exists', async () => {
      jest.spyOn(clientDriver, 'update').mockResolvedValue(undefined);

      const user = { accountId: 'user1', sessionId: 'dsf24', exp: 234, iat: 3245 };
      const clientId = '123';
      const data = { name: 'John Doe', email: 'john.doe@example.com' };

      const result = await service.update(user, clientId, data);

      expect(result).toEqual(
        new ResponseBase({
          code: 'CLI_UPDATE_OK',
          message: 'El cliente ha sido actualizado correctamente.',
          status: 200,
        }),
      );
      expect(clientDriver.getOne).toHaveBeenCalledWith([{ clientId }, { email: data?.email }, { name: data?.name }], {}, {});
      expect(clientDriver.update).toHaveBeenCalledWith(clientId, data);
    });

    it('should throw CustomException on error', async () => {
      const error = new Error('Unexpected error');
      jest.spyOn(clientDriver, 'getOne').mockRejectedValue(error);

      const user: IuserContext = { accountId: 'user1', sessionId: 'dsf24', exp: 234, iat: 3245 };
      const clientId = '123';
      const data = { name: 'John Doe', email: 'john.doe@example.com' };

      await expect(service.update(user, clientId, data)).rejects.toThrow(CustomException);
      expect(clientDriver.getOne).toHaveBeenCalledWith([{ clientId }, { email: data?.email }, { name: data?.name }], {}, {});
    });
  });
});
