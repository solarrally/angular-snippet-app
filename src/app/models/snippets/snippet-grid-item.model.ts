import { UserProfileModel } from "../users/user-profile.model";
import { LanguageModel } from "./language.model";

export class SnippetGridItemModel{
    public id: number;
    public name: string;
    public description: string|null;
    public language: LanguageModel|null;
    public tags: string[]|null;
    public likedByUsers: UserProfileModel[]|null;
    public authorId: string|null;
    public isLiked: boolean;

    constructor(
        id: number,
        name: string,
        description: string|null,
        language: LanguageModel|null,
        tags: string[]|null,
        likedByUsers: UserProfileModel[]|null,
        authorId: string|null,
        isLiked: boolean) 
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.language = language
        this.tags = tags;
        this.likedByUsers = likedByUsers;
        this.authorId = authorId;
        this.isLiked = isLiked;
    }
}