export class UserModel {
    public id: string;
    public firstName: string|null;
    public lastName: string|null;

    constructor(
        id: string,
        firstName: string|null,
        lastName: string|null)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}