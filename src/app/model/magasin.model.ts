import { TypeMagasin } from './enumerations/type-magasin.model';
import { Status } from './enumerations/status.model';
import { IRayon } from './rayon.model';
export interface IMagasin {
  id?: number;
  typeMagasin?: TypeMagasin;
  nomCourt?: string;
  nomLong?: string;
  addressePostal?: string;
  status?: Status;
  phone?: string;
  mobile?: string;
  commentaire?: string;
  autreCommentaire?: string;
  entete?: string;
  compteContribuable?: string;
  registreCommerce?: string;
  registreImposition?: string;
  centreImposition?: string;
  numComptable?: string;
  rayons?: IRayon[];
  magasins?: IMagasin[];
  magasinNomCourt?: string;
  magasinId?: number;
  managerFirstName?: string;
  managerId?: number;
}

export class Magasin implements IMagasin {
  constructor(
    public id?: number,
    public typeMagasin?: TypeMagasin,
    public nomCourt?: string,
    public nomLong?: string,
    public addressePostal?: string,
    public status?: Status,
    public phone?: string,
    public mobile?: string,
    public commentaire?: string,
    public autreCommentaire?: string,
    public entete?: string,
    public compteContribuable?: string,
    public registreCommerce?: string,
    public registreImposition?: string,
    public centreImposition?: string,
    public numComptable?: string,
    public rayons?: IRayon[],
    public magasins?: IMagasin[],
    public magasinNomCourt?: string,
    public magasinId?: number,
    public managerFirstName?: string,
    public managerId?: number
  ) { }
}
