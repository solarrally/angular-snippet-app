import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './terms.component.html'
})

export class TermsComponent extends BaseComponent implements OnInit {
  constructor(
    translateService: TranslateService,
    private titleService: Title) {
    super(translateService);
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate("title-page-terms"));
  }
}
