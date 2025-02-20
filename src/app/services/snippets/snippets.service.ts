import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardModel } from '../../models/snippets/dashboard.model';
import { FiltersModel } from '../../models/snippets/filters.model';
import { ResponseModel, NoDataResponseModel } from '../../models/common/response.model'
import { SearchResultModel } from '../../models/snippets/search-result.model';
import { SnippetModel } from '../../models/snippets/snippet.model';
import { SnippetDetailsModel } from '../../models/snippets/snippet-details.model';
import * as ApiConstants from '../../constants/api.constants'

@Injectable({
  providedIn: 'root'
})

export class SnippetsService {

  constructor(private http: HttpClient) { }

  fetchDashboardStatistics(): Observable<ResponseModel<DashboardModel>> {
    return this.http.get<ResponseModel<DashboardModel>>(
      ApiConstants.AUTH_API + '/snippets/dashboard');
  }

  fetchSnippetsFilters(): Observable<ResponseModel<FiltersModel>> {
    return this.http.get<ResponseModel<FiltersModel>>(
      ApiConstants.AUTH_API + '/snippets/filters');
  }

  search(
    pattern: string|null,
    page: number,
    pageSize: number,
    languageId: number|null,
    authorId: string|null,
    dateFrom: Date|null,
    dateTo: Date|null,
    ownedByCurrentUser: boolean|false,
  ): Observable<ResponseModel<SearchResultModel>> {
    return this.http.post<ResponseModel<SearchResultModel>>(      
      ApiConstants.AUTH_API + '/snippets/search',
      {
        pattern,
        page,
        pageSize,
        languageId,
        authorId,
        dateFrom,
        dateTo,
        ownedByCurrentUser
      });
  }

  get(id: number): Observable<ResponseModel<SnippetModel>> {
    return this.http.get<ResponseModel<SnippetModel>>(
      ApiConstants.AUTH_API + '/snippets/' + id);
  }

  getForView(id: number): Observable<ResponseModel<SnippetDetailsModel>> {
    return this.http.get<ResponseModel<SnippetDetailsModel>>(
      ApiConstants.AUTH_API + '/snippets/' + id + '/view');
  }

  update(
    id: number,
    name: string,
    description: string|null,
    languageId: number,
    text: string,
    tags: string[]|null
  ): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(      
      ApiConstants.AUTH_API + '/snippets/update/' + id,
      {
        name,
        description,
        languageId,
        text,
        tags
      });
  }

  create(
    name: string,
    description: string|null,
    languageId: number,
    text: string,
    tags: string[]|null
  ): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(      
      ApiConstants.AUTH_API + '/snippets/create/',
      {
        name,
        description,
        languageId,
        text,
        tags
      });
  }

  delete(id: number): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(      
      ApiConstants.AUTH_API + '/snippets/delete/' + id, null);
  }

  addRemoveLikes(
    id: number,
    isLiked: boolean
  ): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(      
      ApiConstants.AUTH_API + '/snippets/likes/' + id,
      {
        isLiked
      });
  }
}