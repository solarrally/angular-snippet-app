import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './error-404.component.html'
})

export class Error404Component extends BaseComponent implements OnInit {
  constructor(
    translateService: TranslateService,
    private titleService: Title) {
    super(translateService);
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate('title-page-not-found'));
  }
}
