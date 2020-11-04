import { Status } from './enumerations/status.model';


export interface ICompagnie {
  id?: number;
  libelle?: string;
  status?: Status;
 
}

export class Compagnie implements ICompagnie {
  constructor(public id?: number, public libelle?: string, public status?: Status) {
this.status=this.status|| Status.ACTIVE;

  }
}
