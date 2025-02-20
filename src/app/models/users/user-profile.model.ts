export class UserProfileModel {
    public id: string|null;
    public firstName: string|null;
    public lastName: string|null;
    public imageUrl: string|null;
    public email: string|null;

    constructor(
        id: string|null,
        firstName: string|null, 
        lastName: string|null,
        imageUrl: string|null,
        email: string|null) 
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.email = email;
    }
}