

export interface IMotif {
  id?: number;
  libelle?: string;
  
}

export class Motif implements IMotif {
  constructor(public id?: number, public libelle?: string
  ) {}
}
