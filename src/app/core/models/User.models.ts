export class User {
    constructor(
        private email: string,
        private token: string,
        private localId: string,
        private expirationDate: Date,
        private registered: boolean = false
    ){}

    get expireDate(): any{
        return this.expirationDate;
    }
}