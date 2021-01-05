import { Moment } from 'moment';
import { Status } from './enumerations/status.model';
import { IStockProduit } from './stock-produit.model';
import { IFournisseurProduit } from './fournisseur-produit.model';
export interface IProduit {
  id?: number;
  libelle?: string;
  status?: Status;
  createdAt?: Moment;
  updatedAt?: Moment;
  lastDateOfSale?: Moment;
  lastOrderDate?: Moment;
  lastInventoryDate?: Moment;
  qtyAppro?: number;
  qtySeuilMini?: number;
  etiquetable?: boolean;
  dateperemption?: boolean;
  chiffre?: boolean;
  codeCip?: string;
  codeEan?: string;
  qtyDetails?: number;
  deconditionnable?: boolean;
  remisable?: boolean;
  prixPaf?: number;
  prixUni?: number;
  prixMnp?: number;
  produits?: IProduit[];
  stockProduits?: IStockProduit[];
  fournisseurProduits?: IFournisseurProduit[];
  parentLibelle?: string;
  parentId?: number;
  laboratoireLibelle?: string;
  laboratoireId?: number;
  formeLibelle?: string;
  formeId?: number;
  typeEtyquetteLibelle?: string;
  typeEtyquetteId?: number;
  familleLibelle?: string;
  familleId?: number;
  gammeLibelle?: string;
  gammeId?: number;
  tvaTaux?: string;
  tvaId?: number;
  totalQuantity?: number
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public libelle?: string,
    public status?: Status,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public lastDateOfSale?: Moment,
    public lastOrderDate?: Moment,
    public lastInventoryDate?: Moment,
    public totalQuantity?: number,
    public qtyAppro?: number,
    public qtySeuilMini?: number,
    public etiquetable?: boolean,
    public dateperemption?: boolean,
    public chiffre?: boolean,
    public codeCip?: string,
    public codeEan?: string,
    public qtyDetails?: number,
    public deconditionnable?: boolean,
    public remisable?: boolean,
    public prixPaf?: number,
    public prixUni?: number,
    public prixMnp?: number,
    public produits?: IProduit[],
    public stockProduits?: IStockProduit[],
    public fournisseurProduits?: IFournisseurProduit[],
    public parentLibelle?: string,
    public parentId?: number,
    public laboratoireLibelle?: string,
    public laboratoireId?: number,
    public formeLibelle?: string,
    public formeId?: number,
    public typeEtyquetteLibelle?: string,
    public typeEtyquetteId?: number,
    public familleLibelle?: string,
    public familleId?: number,
    public gammeLibelle?: string,
    public gammeId?: number,
    public tvaTaux?: string,
    public tvaId?: number
  ) {
    this.etiquetable = this.etiquetable || false;
    this.dateperemption = this.dateperemption || false;
    this.chiffre = this.chiffre || false;
    this.deconditionnable = this.deconditionnable || false;
    this.remisable = this.remisable || false;
  }
}
