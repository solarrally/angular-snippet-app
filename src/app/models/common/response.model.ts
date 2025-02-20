export class NoDataResponseModel {
    public isSuccess: boolean;
    public message: string|null;

    constructor(
        isSuccess: boolean, 
        message: string|null) 
    {
        this.isSuccess = isSuccess;
        this.message = message;
    }
}

export class ResponseModel<T> extends  NoDataResponseModel {
    public data: T|null;

    constructor(
        isSuccess: boolean, 
        data: T|null,
        message: string|null) 
    {
        super(isSuccess, message);

        this.data = data;
    }
}