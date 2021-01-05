import { Moment } from 'moment';


export interface IAyantDroit {
  id?: number;
  num?: string;
  firstName?: string;
  lastName?: string;
  sexe?: string;
  datNaiss?: Moment;
  assureFirstName?: string;
  assureId?: number;
  mobile?: string;

}

export class AyantDroit implements IAyantDroit {
  constructor(
    public id?: number,
    public num?: string,
    public firstName?: string,
    public lastName?: string,
    public sexe?: string,
    public datNaiss?: Moment,
    public assureFirstName?: string,
    public assureId?: number,
    public mobile?: string

  ) { }
}
