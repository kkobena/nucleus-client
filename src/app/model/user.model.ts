import { Moment } from 'moment';
export interface IUser {
    id?: number;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    lastModifiedDate?: Moment;
    createdDate?: Moment;
    authorities?: string[];
    role?: string;
    magasinId?: number;
    magasinNom?: string;
    fullName?: string;

}
export class User implements IUser {
    constructor(
        public id?: number,
        public login?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public activated?: boolean,
        public langKey?: string,
        public lastModifiedDate?: Moment,
        public createdDate?: Moment,
        public authorities?: string[],
        public role?: string,
        public magasinId?: number,
        public magasinNom?: string,
        public fullName?: string
    ) {

    }
}
