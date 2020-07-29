

export interface IModePaiement {
  id?: number;
  libelle?: string;
  code?:string
  
}

export class ModePaiement implements IModePaiement {
  constructor(public id?: number, 
    public libelle?: string,
    public code?: string
    ) {}
}
