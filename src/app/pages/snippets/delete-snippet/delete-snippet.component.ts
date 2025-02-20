import { Component, Input } from '@angular/core';
import { AlertService } from '../../../services/common/alert.service';
import { SnippetsService } from '../../../services/snippets/snippets.service';
import { ModalService } from '../../../services/common/modal.service';
import { IModalComponent } from '../../../interfaces/modal.component.interface';
import { ModalTypes } from '../../../models/enums/modal-types.enum';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-delete-snippet',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, TranslateModule],
  templateUrl: './delete-snippet.component.html'
})
export class DeleteSnippetComponent extends BaseComponent implements IModalComponent {
  @Input() data: { snippetId: number; } | null = null;

  public key: string = ModalTypes.Delete.toString();

  constructor(
    translateService: TranslateService,
    private snippetsService: SnippetsService,
    private alertService: AlertService,
    private modalService: ModalService) {
    super(translateService);
  }

  onClick(): void {
    if (this.data?.snippetId != null) {
      this.snippetsService.delete(
        this.data?.snippetId
      ).subscribe({
        next: () => {
          this.alertService.show(this.translate('snippets-delete-success'), 'Success');
          this.modalService.close(this.key);
        }
      });
    }
  }

  onClose(): void {
    this.modalService.close(this.key, true);
  }
}