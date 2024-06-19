import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { IclientDriver } from 'src/drivers/client';
import { ResponseBase } from '../../../common/entity/response-base.model';
import { CustomException } from '../../../common/entity/custom-exception.model';
import { RegisterClientUC } from './register-client.uc.impl';

describe('RegisterClientUC', () => {
  let service: RegisterClientUC;
  let clientDriver: IclientDriver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterClientUC,
        {
          provide: IclientDriver,
          useValue: {
            getOne: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RegisterClientUC>(RegisterClientUC);
    clientDriver = module.get<IclientDriver>(IclientDriver);
  });

  describe('create', () => {
    it('should return conflict if client already exists', async () => {
      const data = { name: 'John Doe', email: 'john.doe@example.com' };
      const result = await service.create(data);

      expect(result).toEqual(
        new ResponseBase({
          code: 'CLI_EXIST_CONFLICT',
          message: 'El cliente ya esta registrado en el sistema.',
          status: HttpStatus.CONFLICT,
        }),
      );
      expect(clientDriver.getOne).toHaveBeenCalledWith([{ name: data.name }, { email: data.email }], undefined, undefined);
    });

    it('should throw CustomException on error', async () => {
      const error = new Error('Unexpected error');
      jest.spyOn(clientDriver, 'getOne').mockRejectedValue(error);

      const data = { name: 'John Doe', email: 'john.doe@example.com' };

      await expect(service.create(data)).rejects.toThrow(CustomException);
      expect(clientDriver.getOne).toHaveBeenCalledWith([{ name: data.name }, { email: data.email }], undefined, undefined);
    });
  });
});
