import { Component, OnInit } from '@angular/core';
import { ProfileUpdaterComponent } from './profile-updater/profile-updater.component';
import { AccountDeactivatorComponent } from './account-deactivator/account-deactivator.component';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../components/base-component/base.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileUpdaterComponent, AccountDeactivatorComponent, TranslateModule],
  templateUrl: './profile.component.html'
})

export class ProfileComponent extends BaseComponent implements OnInit {
  constructor(
    translateService: TranslateService,
    private titleService: Title) {
      super(translateService); }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate('title-page-profile'));    
  }
}
