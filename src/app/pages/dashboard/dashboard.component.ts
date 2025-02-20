import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../../services/snippets/snippets.service';
import { Title } from '@angular/platform-browser';
import { DashboardModel } from '../../models/snippets/dashboard.model'
import { RouterModule } from '@angular/router';
import { UserProfilesService } from '../../services/user-profile/user-profiles.service';
import { UserProfileModel } from '../../models/users/user-profile.model';
import { CreateUpdateSnippetComponent } from '../snippets/create-update-snippet/create-update-snippet.component';
import { DeleteSnippetComponent } from '../snippets/delete-snippet/delete-snippet.component';
import { ViewSnippetComponent } from '../snippets/view-snippet/view-snippet.component';
import { ModalTypes } from '../../models/enums/modal-types.enum';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '../../services/common/modal.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../components/base-component/base.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatButtonModule, TranslateModule],
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent extends BaseComponent implements OnInit {
  pageContent: DashboardModel | null = null;
  profileData: UserProfileModel | null = null;
  selectedSnippetIdForUpdate: number | null = null;
  selectedSnippetIdForView: number | null = null;
  selectedSnippetIdForDelete: number | null = null;

  public ModalTypes = ModalTypes;

  constructor(
    translateService: TranslateService,
    private snippetsService: SnippetsService,
    private userProfilesService: UserProfilesService,
    private modalService: ModalService,
    private titleService: Title) {
      super(translateService);
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate("title-page-dashboard"));

    this._fetchStatistics();
    this._fetchProfileData();
  }

  userCanEdit(authorId: string): boolean {
    return authorId != null && this.profileData?.id == authorId;
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
            () => { this._fetchStatistics() }
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
            () => { this._fetchStatistics() }
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
            () => { this._fetchStatistics() }
          );

          break;
        }
    }
  }

  private _fetchProfileData(): void {
    this.userProfilesService.get()
      .subscribe((response) => {
        this.profileData = response.data;
      });
  }

  private _fetchStatistics(): void {
    this.snippetsService.fetchDashboardStatistics()
      .subscribe({
        next: (response) => {
          this.pageContent = response?.data as DashboardModel;
        }
      });
  }
}
