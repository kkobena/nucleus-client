

export interface IRisque {
  id?: number;
  code?: string;
  libelle?: string;
  typerisqueLibelle?: string;
  typerisqueId?: number;
}

export class Risque implements IRisque {
  constructor(
    public id?: number,
    public code?: string,
    public libelle?: string,
    public typerisqueLibelle?: string,
    public typerisqueId?: number
  ) {}
}
