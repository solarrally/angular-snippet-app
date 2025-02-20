import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../services/common/alert.service';
import { SnippetsService } from '../../../services/snippets/snippets.service';
import { SnippetModel } from '../../../models/snippets/snippet.model';
import { FiltersModel } from '../../../models/snippets/filters.model';
import { ModalService } from '../../../services/common/modal.service';
import { IModalComponent } from '../../../interfaces/modal.component.interface';
import { ModalTypes } from '../../../models/enums/modal-types.enum';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-create-update-snippet',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogTitle, MatDialogContent, TranslateModule],
  templateUrl: './create-update-snippet.component.html'
})
export class CreateUpdateSnippetComponent extends BaseComponent implements OnInit, IModalComponent {
  @Input() data: { snippetId: number; } | null = null;

  form: FormGroup;
  filtersData: FiltersModel | null = null;
  title: string = this.translate('snippets-add');
  public key: string = ModalTypes.AddUpdate.toString();

  constructor(
    translateService: TranslateService,
    private formBuilder: FormBuilder,
    private snippetsService: SnippetsService,
    private alertService: AlertService,
    private modalService: ModalService) {
    super(translateService);
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      text: ['', Validators.required],
      languageId: ['', Validators.required],
      tag: [],
      tags: []
    });
  }

  ngOnInit(): void {
    this._initFilters();

    if (this.data?.snippetId != null) {
      this.snippetsService.get(this.data.snippetId).subscribe((response) => {
        this._initForm(response.data);
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { name, description, languageId, text, tags } = this.form.value;

      if (this.data?.snippetId != null) {
        this.snippetsService.update(
          this.data.snippetId,
          name,
          description,
          languageId,
          text,
          tags
        ).subscribe({
          next: () => {
            this.alertService.show(this.translate('snippets-update-success'), 'Success');
            this.modalService.close(this.key);
          }
        });
      }

      else {
        this.snippetsService.create(
          name,
          description,
          languageId,
          text,
          tags
        ).subscribe({
          next: () => {
            this.alertService.show(this.translate('snippets-create-success'), 'Success');
            this.modalService.close(this.key);
          }
        });
      }
    }
  }

  onClose(): void {
    this.modalService.close(this.key, true);
  }

  getTitle(): string {
    this.title = this.data?.snippetId != null ? this.translate('snippets-edit') : this.translate('snippets-add');
    return this.title;
  }

  addTag(): void {
    const tagValue = this.form.get('tag')?.value;
    let tags: string[] | null = this.form.get('tags')?.value;

    if (tagValue && !tags?.includes(tagValue)) {
      if (tags == null) {
        tags = [];
      }

      tags.push(tagValue);
      this.form.get('tags')?.setValue(tags);
    }

    this.form.get('tag')?.setValue('');
  }

  removeTag(tag: string): void {
    let tags: string[] = this.form.get('tags')?.value;
    if (tags?.length > 0) {
      tags = tags.filter(record => record !== tag);

      this.form.get('tags')?.setValue(tags);
    }
  }

  private _initFilters(): void {
    this.snippetsService.fetchSnippetsFilters()
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.filtersData = response.data as FiltersModel;
          }
        }
      });
  }

  private _initForm(data: SnippetModel | null) {
    if (data) {
      this.form.patchValue({
        name: data.name,
        description: data.description,
        text: data.text,
        languageId: data.languageId,
        tag: [],
        tags: data.tags
      }
      )
    }
  }
}