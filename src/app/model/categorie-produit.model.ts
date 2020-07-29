

export interface ICategorieProduit {
  id?: number;
  code?: string;
  libelle?: string;
 
}

export class CategorieProduit implements ICategorieProduit {
  constructor(
    public id?: number,
    public code?: string,
    public libelle?: string,
  
  ) {}
}
