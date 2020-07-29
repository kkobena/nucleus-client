

export interface IModelFacture {
  id?: number;
  libelle?: string;
  code?: string;
  typeDataSource?: string;
  fichier?: string;
  fichierVariante?: string;
 
}

export class ModelFacture implements IModelFacture {
  constructor(
    public id?: number,
    public libelle?: string,
    public code?: string,
    public typeDataSource?: string,
    public fichier?: string,
    public fichierVariante?: string
 
  ) {}
}
