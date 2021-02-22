import { Status } from "./enumerations/status.model";

export interface IProduitCriteria {
    search?: string;
    codeCip?: string;
    libelle?: string;
    status?: Status;
    id?: number;
    codeEan?: string;
    dateperemption?: boolean;
    deconditionnable?: boolean;
    qtySeuilMini?: number;
    qtyAppro?: number;
    parentId?: number;
    prixPaf?: number;
    prixUni?: number;
    formeId?: number;
    familleId?: number;
    gammeId?: number;
    laboratoireId?: number;
    tvaId?: number;
    magasinId?: number;
    rayonId?: number;
    deconditionne?: boolean;
    remiseId?: number;

}
export class ProduitCriteria implements IProduitCriteria {
    constructor(
        public search?: string,
        public codeCip?: string,
        public libelle?: string,
        public status?: Status,
        public id?: number,
        public codeEan?: string,
        public dateperemption?: boolean,
        public deconditionnable?: boolean,
        public qtySeuilMini?: number,
        public qtyAppro?: number,
        public parentId?: number,
        public prixPaf?: number,
        public prixUni?: number,
        public formeId?: number,
        public familleId?: number,
        public gammeId?: number,
        public laboratoireId?: number,
        public tvaId?: number,
        public magasinId?: number,
        public rayonId?: number,
        public deconditionne?: boolean,
        public remiseId?: number

    ) {
        this.laboratoireId = this.laboratoireId || null;
        this.magasinId = this.magasinId || null;
        this.familleId = this.familleId || null;
        this.tvaId = this.tvaId || null;
        this.rayonId = this.rayonId || null;
        this.gammeId = this.gammeId || null;
        this.remiseId = this.remiseId || null;
        this.deconditionnable = this.deconditionnable || null;
        this.deconditionne = this.deconditionne || null;
        this.status = this.status || Status.ACTIVE;
        this.search = this.search || null;
    }
}
