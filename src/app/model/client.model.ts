import { Moment } from 'moment';
import { Status } from './enumerations/status.model';
import { TypeClient } from './enumerations/type-client.model';


export interface IClient {
  id?: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  status?: Status;
  num?: string;
  firstName?: string;
  lastName?: string;
  sexe?: string;
  codeInterne?: string;
  datNaiss?: Moment;
  typeClient?: TypeClient;
  compagnieLibelle?: string;
  compagnieId?: number;
  remiseValeur?: string;
  remiseId?: number;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public  createdAt?: Moment,
    public updatedAt?: Moment,
    public status?: Status,
    public num?: string,
    public firstName?: string,
    public lastName?: string,
    public sexe?: string,
    public codeInterne?: string,
    public datNaiss?: Moment,
    public typeClient?: TypeClient,
    public compagnieLibelle?: string,
    public compagnieId?: number,
    public remiseValeur?: string,
    public remiseId?: number
  ) {}
}
