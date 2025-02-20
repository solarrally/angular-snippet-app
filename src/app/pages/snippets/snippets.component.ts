import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../../services/snippets/snippets.service';
import { Title } from '@angular/platform-browser';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FiltersModel } from '../../models/snippets/filters.model';
import { SearchResultModel } from '../../models/snippets/search-result.model';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component'
import { AlertService } from '../../services/common/alert.service'
import { ViewSnippetComponent } from './view-snippet/view-snippet.component'
import { CreateUpdateSnippetComponent } from './create-update-snippet/create-update-snippet.component';
import { DeleteSnippetComponent } from './delete-snippet/delete-snippet.component'
import { UserProfilesService } from '../../services/user-profile/user-profiles.service';
import { UserProfileModel } from '../../models/users/user-profile.model';
import { ModalTypes } from '../../models/enums/modal-types.enum';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '../../services/common/modal.service';
import * as GridConstants from '../../constants/grid.constants'
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../components/base-component/base.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    PaginationComponent,
    MatButtonModule,
    TranslateModule],
  templateUrl: './snippets.component.html'
})

export class SnippetsComponent extends BaseComponent implements OnInit {
  authorizedUser: UserProfileModel | null = null;
  filtersData: FiltersModel | null = null;
  snippetsGrid: SearchResultModel | null = null;

  pattern: string | null = null;
  selectedLanguageId: number | null = null;
  selectedAuthorId: string | null = null;
  selectedDateFrom: Date | null = null;
  selectedDateTo: Date | null = null;
  ownedByCurrentUser: boolean = false;
  currentPage: number = 1;

  public ModalTypes = ModalTypes;

  constructor(
    translateService: TranslateService,
    private snippetsService: SnippetsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userProfilesService: UserProfilesService,
    private alertService: AlertService,
    private modalService: ModalService,
    private titleService: Title) {
      super(translateService); 
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate('title-page-snippets'));
    this.pattern = this.router.parseUrl(this.router.url).queryParams['pattern'];

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.pattern = params.get('pattern') || '';
      this._fetchSnippets();
    });
    
    this.userProfilesService.get()
      .subscribe((response) => {
        this.authorizedUser = response.data;
      });

    this._initFilters();
    this._fetchSnippets();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this._fetchSnippets();
  }

  onFilterChange(
    languageId: string | null,
    authorId: string | null,
    dateFrom: string,
    dateTo: string,
    ownedByCurrentUser: boolean): void {
    this.selectedLanguageId = Number(languageId);
    this.selectedAuthorId = authorId;
    this.selectedDateFrom = new Date(dateFrom);
    this.selectedDateTo = new Date(dateTo);
    this.ownedByCurrentUser = ownedByCurrentUser;

    if (this.selectedDateFrom > this.selectedDateTo) {
      this.alertService.show(this.translate('error-date-to-earlier-than-date-from'), 'Warning');
      return;
    }

    this._refreshGrid();
  }

  userCanEdit(authorId: string): boolean {
    return authorId != null && this.authorizedUser?.id == authorId;
  }

  openModal(
    snippetId: number | null,
    modal: ModalTypes): void {
    switch (modal) {
      case ModalTypes.AddUpdate:
        {
          this.modalService.open(
            ModalTypes.AddUpdate.toString(),
            CreateUpdateSnippetComponent,
            true,
            { snippetId: snippetId },
            () => { this._refreshGrid() }
          );

          break;
        }
      case ModalTypes.View:
        {
          this.modalService.open(
            ModalTypes.View.toString(),
            ViewSnippetComponent,
            true,
            { snippetId: snippetId },
            () => { this._refreshGrid() }
          );

          break;
        }
      case ModalTypes.Delete:
        {
          this.modalService.open(
            ModalTypes.Delete.toString(),
            DeleteSnippetComponent,
            true,
            { snippetId: snippetId },
            () => { this._refreshGrid() }
          );

          break;
        }
    }
  }

  _initFilters(): void {
    this.snippetsService.fetchSnippetsFilters()
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.filtersData = response.data as FiltersModel;
          }
        }
      });
  }

  private _fetchSnippets(): void {
    this.snippetsService.search(
      this.pattern,
      this.currentPage,
      GridConstants.DEFAULT_PAGE_SIZE,
      this.selectedLanguageId,
      this.selectedAuthorId,
      this.selectedDateFrom,
      this.selectedDateTo,
      this.ownedByCurrentUser
    )
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.snippetsGrid = response.data as SearchResultModel;
          }
        }
      });
  }

  private _refreshGrid(): void {
    this.currentPage = 1;
    this._fetchSnippets();
  }
}
