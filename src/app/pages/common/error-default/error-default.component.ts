import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-default',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './error-default.component.html'
})

export class ErrorDefaultComponent extends BaseComponent implements OnInit {
  constructor(
    translateService: TranslateService,
    private titleService: Title) {
    super(translateService);
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate('title-page-error-default'));
  }
}
