
export interface ITypeRisque {
  id?: number;
  code?: string;
  libelle?: string;

}

export class TypeRisque implements ITypeRisque {
  constructor(public id?: number, public code?: string, public libelle?: string) {}
}
