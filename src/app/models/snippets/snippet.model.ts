export class SnippetModel{
    public name: string;
    public text: string;
    public description: string|null;
    public languageId: number;
    public tags: string[]|null;

    constructor(
        name: string,
        text: string,
        description: string|null,
        languageId: number,
        tags: string[]|null) 
    {
        this.name = name;
        this.text = text;
        this.description = description;
        this.languageId = languageId
        this.tags = tags;
    }
}