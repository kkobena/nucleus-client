import { Moment } from 'moment';
import { Status } from './enumerations/status.model';
import { IStockProduit } from './stock-produit.model';


export interface IRayon {
  id?: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  status?: Status;
  code?: string;
  libelle?: string;
  stockProduits?: IStockProduit[];
  magasinNomCourt?: string;
  magasinId?: number;
  exclude?: boolean;
}

export class Rayon implements IRayon {
  constructor(
    public id?: number,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public status?: Status,
    public code?: string,
    public libelle?: string,
    public stockProduits?: IStockProduit[],
    public magasinNomCourt?: string,
    public magasinId?: number,
    public exclude?: boolean
  ) {
    this.exclude = this.exclude || false;
  }
}
