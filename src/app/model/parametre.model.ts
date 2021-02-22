export interface IParametre {
    id?: number
    key?: string;
    value?: string;
    dtype?: string;

}

export class Parametre implements IParametre {
    constructor(
        public id?: number,
        public key?: string,
        public value?: string,
        public dtype?: string,

    ) {

    }
}
