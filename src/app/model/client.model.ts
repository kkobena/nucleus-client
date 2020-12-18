import { Moment } from 'moment';
import { IAyantDroit } from './ayant-droit.model';
import { CategorieAssurance } from './enumerations/categorie-assurance.model';
import { Status } from './enumerations/status.model';
import { TypeClient } from './enumerations/type-client.model';


export interface IClient {
  id?: number;
  status?: Status;
  firstName?: string;
  lastName?: string;
  sexe?: string;
  datNaiss?: Moment;
  compagnieLibelle?: string;
  compagnieId?: number;
  remiseValeur?: string;
  remiseId?: number;
  encours?: number,
  mobile?: string;
  mail?: string;
  numMaticule?: string;
  compteClient?: ICompteClient,
  compteClients?: ICompteClient[],
  ayantDroits?: IAyantDroit[]
}
export interface ICompteClient {
  id?: number;
  encours?: number;
  libelleTiersPayantF?: string;
  plafondJournalier?: number;
  plafondMensuel?: number;
  consommation?: number;
  consoJournaliere?: number;
  taux?: number;
  numMaticule?: string;
  enbale?: boolean;
  absolute?: boolean;
  categorie?: CategorieAssurance;
  clientId?: number;
  typeClient?: TypeClient;
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
    public numMaticule?: string,
    public enbale?: boolean,
    public absolute?: boolean,
    public categorie?: CategorieAssurance,
    public clientId?: number,
    public tierspayantId?: number,
    public status?: Status,
    public typeClient?: TypeClient,
    public libelleTiersPayantF?: string

  ) {
    this.enbale = this.enbale || true;
    this.absolute = this.absolute || false;
    this.encours = this.encours || 0;
    this.categorie = this.categorie || CategorieAssurance.RO;

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
    public compagnieLibelle?: string,
    public compagnieId?: number,
    public remiseValeur?: string,
    public remiseId?: number,
    public compteClients?: ICompteClient[],
    public encours?: number,
    public mail?: string,
    public mobile?: string,
    public ayantDroits?: IAyantDroit[],
    public compteClient?: ICompteClient
  ) {

    this.status = this.status || Status.ACTIVE;
    this.compteClients = this.compteClients || [];
    this.ayantDroits = this.ayantDroits || [];

  }
}
