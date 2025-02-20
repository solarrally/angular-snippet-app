import { Component, Input, OnChanges } from '@angular/core';
import { SnippetsService } from '../../../services/snippets/snippets.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-like-snippet',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './like-snippet.component.html'
})

export class LikeSnippetComponent extends BaseComponent implements OnChanges {
  @Input() id: number|null = null;
  @Input() isLiked: boolean = false;

  isLikedValue: boolean = false;

  constructor(
    translateService: TranslateService,
    private snippetsService: SnippetsService) { 
      super(translateService); }

  ngOnChanges(): void {
    this.isLikedValue = this.isLiked;
  }

  onAddRemoveLikeClick(
    isLiked: boolean
  ): void
  {
    this.snippetsService.addRemoveLikes(this.id!, isLiked)
    .subscribe({
      next: () => { 
        this.isLikedValue = isLiked;
      }
    }); 
  }
}