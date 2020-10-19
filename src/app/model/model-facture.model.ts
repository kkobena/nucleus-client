

export interface IModelFacture {
  id?: number;
  libelle?: string;
  code?: string;
  fichier?: string;
}

export class ModelFacture implements IModelFacture {
  constructor(
    public id?: number,
    public libelle?: string,
    public code?: string,
    public fichier?: string
 
  ) {}
}
