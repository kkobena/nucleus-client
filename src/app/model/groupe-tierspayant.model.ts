

export interface IGroupeTierspayant {
  id?: number;
  code?: string;
  libelle?: string;
  phone?:string;
  address?:string

}

export class GroupeTierspayant implements IGroupeTierspayant {
  constructor(
    public id?: number,
    public code?: string,
    public libelle?: string,
    public phone?:string,
    public  address?:string
 
  ) {}
}
