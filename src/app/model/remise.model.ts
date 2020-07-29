

export interface IRemise {
  id?: number;
  valeur?: string;
  remiseValue?: number;
  
}

export class Remise implements IRemise {
  constructor(
    public id?: number,
    public valeur?: string,
    public remiseValue?: number
  
  ) {}
}
