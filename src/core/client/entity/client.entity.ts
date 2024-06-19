import { EstatusClient } from '../../../commons/enum/client/status-client.enum';
export interface Iclient {
  clientId: string;

  code: string;

  name: string;

  email: string;

  password: string;

  status: EstatusClient;

  location?: object;

  cityId?: string;

  mobileNumber?: string;
}
