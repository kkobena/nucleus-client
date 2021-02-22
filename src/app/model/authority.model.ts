import { IPermission } from "./permission.model";

export interface IAuthority {
    name?: string;
    libelle?: string;
    permission?: IPermission[]
}
export class Authority implements Authority {
    constructor(
        public name?: string,
        public libelle?: string,
        public permission?: IPermission[]
    ) {

    }
}
