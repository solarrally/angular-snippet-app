export class SnippetDetailsModel{
    public id: number;
    public name: string;
    public text: string;
    public languageCode: string;
    public authorId: string;
    public isLiked: boolean;

    constructor(
        id: number,
        name: string,
        text: string,
        languageCode: string,
        authorId: string,
        isLiked: boolean) 
    {
        this.id = id;
        this.name = name;
        this.text = text;
        this.languageCode = languageCode;
        this.authorId = authorId;
        this.isLiked = isLiked;
    }
}