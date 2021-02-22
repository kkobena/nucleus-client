
export interface IPermission {
    name?: string;
    description?: string;
    id?: number
}
export class Permission implements Permission {
    constructor(
        public name?: string,
        public description?: string,
        public id?: number
    ) {

    }
}
