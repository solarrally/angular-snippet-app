import { SnippetGridItemModel } from '../snippets/snippet-grid-item.model'
import { UserStatisticsModel } from '../users/user-statistics.model'

export class DashboardModel {
    public snippets: SnippetGridItemModel[]|null;
    public userStatistics: UserStatisticsModel|null;

    constructor(
        snippets: SnippetGridItemModel[]|null,
        userStatistics: UserStatisticsModel|null) 
    {
        this.snippets = snippets;
        this.userStatistics = userStatistics;
    }
}
