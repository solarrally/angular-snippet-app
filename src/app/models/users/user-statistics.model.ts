export class UserStatisticsModel {

    public snippetsInTheCurrentMonth: number;
    public snippetsTotal: number;
    public snippetsTotalLikesByUsers: number;

    constructor(
        snippetsInTheCurrentMonth: number,
        snippetsTotal:  number,
        snippetsTotalLikesByUsers: number) 
    {
        this.snippetsInTheCurrentMonth = snippetsInTheCurrentMonth;
        this.snippetsTotal = snippetsTotal;
        this.snippetsTotalLikesByUsers = snippetsTotalLikesByUsers;
    }
}
