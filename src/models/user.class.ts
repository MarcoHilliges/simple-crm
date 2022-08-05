export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number | null;
    street: string;
    zipCode: number;
    city: string;
    jobRole: string;
    avatar: string;
    id: string;

    constructor(obj?:any){
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : null;
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : 'unknown';
        this.jobRole = obj ? obj.jobRole : 'Guest';
        this.avatar = obj ? obj.avatar : 'avatar4';
        this.id = obj ? obj.id : '';
    }

    public toJSON(){
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            jobRole: this.jobRole,
            avatar: this.avatar,
            id: this.id
        };
    }

}