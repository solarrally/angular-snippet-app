import { SnippetGridItemModel } from "./snippet-grid-item.model";

export class SearchResultModel {
    results: SnippetGridItemModel[]|null;
    page: number;
    pageSize: number;
    totalRecordsCount: number;
    totalPages: number;

    constructor(
        results: SnippetGridItemModel[]|null,
        page: number,
        pageSize: number,
        totalRecordsCount: number,
        totalPages: number
    )
    {
        this.results = results;
        this.page = page;
        this.pageSize = pageSize;
        this.totalRecordsCount = totalRecordsCount;
        this.totalPages = totalPages;
    }
}