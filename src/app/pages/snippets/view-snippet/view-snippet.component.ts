import { Component, Input, OnInit } from '@angular/core';
import { SnippetsService } from '../../../services/snippets/snippets.service';
import { LikeSnippetComponent } from '../like-snippet/like-snippet.component';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';
import { SnippetDetailsModel } from '../../../models/snippets/snippet-details.model';
import { IModalComponent } from '../../../interfaces/modal.component.interface';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { ModalTypes } from '../../../models/enums/modal-types.enum';
import { ModalService } from '../../../services/common/modal.service';
import { UserProfileModel } from '../../../models/users/user-profile.model';
import { UserProfilesService } from '../../../services/user-profile/user-profiles.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [CommonModule, Highlight, LikeSnippetComponent, MatDialogTitle, MatDialogContent, TranslateModule],
  templateUrl: './view-snippet.component.html'
})

export class ViewSnippetComponent extends BaseComponent implements OnInit, IModalComponent {
  @Input() data: { snippetId: number; } | null = null;

  public key: string = ModalTypes.View.toString();

  content: SnippetDetailsModel | null = new SnippetDetailsModel(0, '', '', '', '', false);
  authorizedUser: UserProfileModel | null = null;

  constructor(
    translateService: TranslateService,
    private clipboard: Clipboard,
    private snippetsService: SnippetsService,
    private userProfilesService: UserProfilesService,
    private modalService: ModalService) {
    super(translateService);
  }

  ngOnInit(): void {
    this.userProfilesService.get()
      .subscribe((response) => {
        this.authorizedUser = response.data;
      });

    if (this.data?.snippetId != null) {
      this.snippetsService.getForView(this.data?.snippetId)
        .subscribe((response) => {
          this.content = response.data;
        });
    }
  }

  onClose(): void {
    this.modalService.close(this.key, true);
  }

  copyMessage(): void {
    this.clipboard.copy(this.content!.text);
  }
}