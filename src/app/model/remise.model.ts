

export interface IRemise {
  id?: number;
  valeur?: string;
  remiseValue?: number;
  typeRemise?: string;
  typeLibelle?: string;

}

export class Remise implements IRemise {
  constructor(
    public id?: number,
    public valeur?: string,
    public remiseValue?: number,
    public typeRemise?: string,
    public typeLibelle?: string

  ) { }
}
