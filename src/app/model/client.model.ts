import { Moment } from 'moment';
import { Status } from './enumerations/status.model';
import { TypeClient } from './enumerations/type-client.model';


export interface IClient {
  id?: number;
  status?: Status;
  firstName?: string;
  lastName?: string;
  sexe?: string;
  datNaiss?: Moment;
  typeClient?: TypeClient;
  compagnieLibelle?: string;
  compagnieId?: number;
  remiseValeur?: string;
  remiseId?: number;
  plafond?: number;
  encours?: number,
  typePlafond?: boolean;
  compteClients?: ICompteClient[]
}
export interface ICompteClient {
  id?: number;
  encours?: number;
  version?: number;
  plafondJournalier?: number;
  plafondMensuel?: number;
  consommation?: number;
  consoJournaliere?: number;
  taux?: number;
  principal?: boolean;
  numMaticule?: string;
  enbale?: boolean;
  bIsAbsolute?: boolean;
  categorie?: string;
  clientId?: number;
  tierspayantId?: number;
}

export class CompteClient implements ICompteClient {
  constructor(
    public id?: number,
    public encours?: number,
    public plafondJournalier?: number,
    public plafondMensuel?: number,
    public consommation?: number,
    public consoJournaliere?: number,
    public taux?: number,
    public principal?: boolean,
    public numMaticule?: string,
    public enbale?: boolean,
    public bIsAbsolute?: boolean,
    public categorie?: string,
    public clientId?: number,
    public tierspayantId?: number
  ) {
    this.principal = this.principal || false;
    this.enbale = this.enbale || false;
    this.bIsAbsolute = this.bIsAbsolute || false;
    this.encours = this.encours || 0;
  }
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public status?: Status,
    public firstName?: string,
    public lastName?: string,
    public sexe?: string,
    public datNaiss?: Moment,
    public typeClient?: TypeClient,
    public compagnieLibelle?: string,
    public compagnieId?: number,
    public remiseValeur?: string,
    public remiseId?: number,
    public plafond?: number,
    public typePlafond?: boolean,
    public compteClients?: ICompteClient[],
    public encours?: number
  ) {
    this.typePlafond = this.typePlafond || false;
  }
}
