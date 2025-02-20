export class SnippetCodeVisualizerModel{
    public name: string;
    public text: string;
    public languageId: number;

    constructor(
        name: string,
        text: string,
        languageId: number) 
    {
        this.name = name;
        this.text = text;
        this.languageId = languageId
    }
}