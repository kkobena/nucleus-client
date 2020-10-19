import { Moment } from 'moment';
import { TypeTierspayant } from './enumerations/type-tierspayant.model';
import { Status } from './enumerations/status.model';


export interface ITierspayant {
  id?: number;
  //createdAt?: Moment;
  //updatedAt?: Moment;
  code?: string;
  libelCourt?: string;
  libelLong?: string;
  plafond?: number;
  plafondVente?: number;
  typePlafond?: boolean;
  consoJournaliere?: number;
  consoMensuelle?: number;
  typeTp?: TypeTierspayant;
  codeComptable?: string;
  nbreBordereaux?: number;
  registrecommerce?: string;
  groupetpLibelle?: string;
  groupetpId?: number;
  risqueLibelle?: string;
  risqueId?: number;
  modelFactureLibelle?: string;
  modelFactureId?: number;
  phone?:string;
  mobile?:string;
  enable?:boolean,
  address?:string,
  montantMaxFacture?:number,
  remiseForfetaire?:number
}

export class Tierspayant implements ITierspayant {
  constructor(
    public id?: number,
   // public createdAt?: Moment,
   // public updatedAt?: Moment,
    public code?: string,
    public libelCourt?: string,
    public libelLong?: string,
    public plafond?: number,
    public typePlafond?: boolean,
    public consoJournaliere?: number,
    public consoMensuelle?: number,
    public typeTp?: TypeTierspayant,
    public codeComptable?: string,
    public nbreBordereaux?: number,
    public registrecommerce?: string,
    public status?: Status,
    public groupetpLibelle?: string,
    public groupetpId?: number,
    public risqueLibelle?: string,
    public risqueId?: number,
    public modelFactureLibelle?: string,
    public modelFactureId?: number,
    public phone?:string,
    public mobile?:string,
    public enable?:boolean,
    public address?:string,
    public montantMaxFacture?: number
  ) {
    this.typePlafond = this.typePlafond || false;
  }
}
