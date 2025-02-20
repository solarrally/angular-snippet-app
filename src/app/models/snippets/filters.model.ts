import { UserModel } from "../users/user.model";
import { LanguageModel } from "./language.model";

export class FiltersModel {
    public languages: LanguageModel[];
    public users: UserModel[];

    constructor(
        languages: LanguageModel[],
        users: UserModel[])
    {
        this.languages = languages;
        this.users = users;
    }
}