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
  perimeAt?: Moment;
  lastDateOfSale?: Moment;
  lastOrderDate?: Moment;
  lastInventoryDate?: Moment;
  qtyAppro?: number;
  qtySeuilMini?: number;
  dateperemption?: boolean;
  chiffre?: boolean;
  codeCip?: string;
  codeEan?: string;
  qtyDetails?: number;
  deconditionnable?: boolean;
  prixPaf?: number;
  prixUni?: number;
  prixMnp?: number;
  produits?: IProduit[];
  stockProduits?: IStockProduit[];
  fournisseurProduits?: IFournisseurProduit[];
  fournisseurProduit?: IFournisseurProduit,
  stockProduit?: IStockProduit,
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
  remiseId?: number,
  tauxRemise?: number;
  totalQuantity?: number,
  qtyStatus?: string
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public libelle?: string,
    public status?: Status,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public perimeAt?: Moment,
    public lastDateOfSale?: Moment,
    public lastOrderDate?: Moment,
    public lastInventoryDate?: Moment,
    public totalQuantity?: number,
    public qtyAppro?: number,
    public qtySeuilMini?: number,
    public dateperemption?: boolean,
    public chiffre?: boolean,
    public codeCip?: string,
    public codeEan?: string,
    public qtyDetails?: number,
    public deconditionnable?: boolean,
    public prixPaf?: number,
    public prixUni?: number,
    public prixMnp?: number,
    public produits?: IProduit[],
    public stockProduits?: IStockProduit[],
    public stockProduit?: IStockProduit,
    public fournisseurProduits?: IFournisseurProduit[],
    public fournisseurProduit?: IFournisseurProduit,
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
    public tvaId?: number,
    public remiseId?: number,
    public tauxRemise?: number
  ) {
    this.dateperemption = this.dateperemption || false;
    this.chiffre = this.chiffre || true;
    this.deconditionnable = this.deconditionnable || false;
    this.status = this.status || Status.ACTIVE;
  }
}
