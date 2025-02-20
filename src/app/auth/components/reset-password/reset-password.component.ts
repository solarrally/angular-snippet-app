import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlertService } from '../../../services/common/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
    selector: 'app-reset-passoword',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
    templateUrl: './reset-password.component.html'
  })
  
  export class ResetPasswordComponent extends BaseComponent implements OnInit {
    form: FormGroup;

    constructor(
      translateService: TranslateService,
      private formBuilder: FormBuilder, 
      private authService: AuthService, 
      private titleService: Title,
      private alertService: AlertService,
      private router: Router) {  
        super(translateService);  

        this.form = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
        });
    } 

    ngOnInit(): void {
      this.titleService.setTitle(this.translate('title-reset-password'));
    }

    onSubmit(): void {
      if (this.form.valid) {
        const { email } = this.form.value;
  
        this.authService.resetPassword(email).subscribe({
          next: () => {
            this.router.navigate(['/']);
            this.alertService.show(this.translate('account-reset-password-success'), 'Success');
          }
        });
      }
    }
}
