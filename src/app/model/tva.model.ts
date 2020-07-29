
export interface ITva {
  id?: number;
  taux?: number;
 
}

export class Tva implements ITva {
  constructor(public id?: number, public taux?: number) {}
}
