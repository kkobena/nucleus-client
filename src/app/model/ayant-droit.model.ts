import { Moment } from 'moment';


export interface IAyantDroit {
  id?: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  num?: string;
  firstName?: string;
  lastName?: string;
  sexe?: string;
  codeInterne?: string;
  datNaiss?: Moment;
  assureFirstName?: string;
  assureId?: number;
  categorieLibelle?: string;
  categorieId?: number;
}

export class AyantDroit implements IAyantDroit {
  constructor(
    public id?: number,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public num?: string,
    public firstName?: string,
    public lastName?: string,
    public sexe?: string,
    public codeInterne?: string,
    public datNaiss?: Moment,
    public assureFirstName?: string,
    public assureId?: number,
    public categorieLibelle?: string,
    public categorieId?: number
  ) {}
}
