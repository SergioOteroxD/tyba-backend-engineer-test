import { Column, Entity, Index } from 'typeorm';
import { Iclient } from '../../../core/client/entity/client.entity';
import { EstatusClient } from '../../../commons/enum/client/status-client.enum';

@Index('client_pkey', ['clientId'], { unique: true })
@Index('client_un_code', ['code'], { unique: true })
@Index('client_un_email', ['email'], { unique: true })
@Entity('clients')
export class Clients implements Iclient {
  @Column('character varying', {
    primary: true,
    name: 'client_id',
    length: 15,
  })
  clientId: string;

  @Column('character varying', { name: 'code', unique: true, length: 8 })
  code: string;

  @Column('character varying', { name: 'name', length: 80 })
  name: string;

  @Column('character varying', { name: 'email', unique: true, length: 80 })
  email: string;

  @Column('character varying', { name: 'password', length: 250 })
  password: string;

  @Column('character varying', { name: 'status', length: 20, default: () => `'ACTIVE'` })
  status: EstatusClient;

  @Column('json', { name: 'location', nullable: true })
  location?: object;

  @Column('character varying', {
    name: 'mobile_number',
    nullable: true,
    length: 6,
  })
  mobileNumber?: string;

  @Column('timestamp without time zone', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updateAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
