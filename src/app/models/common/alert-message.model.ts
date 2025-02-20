export interface IAlertMessageModel {
    text: string | null;
    show: boolean;
    type: string |null;
}

export class AlertMessageModel implements IAlertMessageModel {
    public text: string | null;
    public show: boolean;
    public type: string|null;

    constructor(
        show: boolean, 
        text: string|null,
        type: string|null) 
    {
        this.show = show;
        this.text = text;
        this.type = type;
    }
}