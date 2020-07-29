

export interface ITypeInventaire {
  id?: number;
  libelle?: string;
 
}

export class TypeInventaire implements ITypeInventaire {
  constructor(public id?: number, public libelle?: string) {}
}
