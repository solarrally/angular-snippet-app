export class LanguageModel {
    public id: number;
    public name: string;
    public code: string|null;

    constructor(
        id: number,
        name: string,
        code: string|null)
    {
        this.id = id;
        this.name = name;
        this.code = code;
    }
}