import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlertService } from '../../../services/common/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-confirm-account',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './confirm-account.component.html'
})

export class ConfirmAccountComponent extends BaseComponent implements OnInit{

  constructor(
    translateService: TranslateService,
    private authService: AuthService,
    private titleService: Title,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute) { 
      super(translateService)
    }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate("title-confirm-account"));

    this.activatedRoute.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];

      if (!token || !email) {

        this.alertService.show(this.translate("account-confirm-error"), 'Error');
      }
      else {

        this.authService.confirmAccount(email!, token!)
          .subscribe({
            next: () => {
              this.alertService.show(this.translate('account-confirm-success'), 'Success');
            }
          });
      }
    });
  }
}
