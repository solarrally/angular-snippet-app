import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './pagination.component.html'
  })

export class PaginationComponent extends BaseComponent {
  @Input() currentPage!: number;
  @Input() totalItems!: number;
  @Input() itemsPerPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  constructor(
    translateService: TranslateService){
      super(translateService);
    }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage() : void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage() : void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(page: number) : void {
    if(page !== null) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}