import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthControlsValidator } from '../../services/auth-controls.validator';
import { matchingValuesValidatorFn } from '../../services/auth-forms.validator';
import { AlertService } from '../../../services/common/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
    selector: 'app-set-passoword',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
    templateUrl: './set-password.component.html'
  })
  
  export class SetPasswordComponent extends BaseComponent implements OnInit {
    form: FormGroup;
    email: string|null = null;
    resetToken: string|null = null;

    constructor(
      translateService: TranslateService,
      private formBuilder: FormBuilder, 
      private authService: AuthService, 
      private titleService: Title,
      private authControlsValidator: AuthControlsValidator,
      private alertService: AlertService,
      private router: Router) {    
        super(translateService);

        this.form = this.formBuilder.group({
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required, authControlsValidator.passwordStrengthValidator]],
        },
        {
          validators: matchingValuesValidatorFn('password', 'confirmPassword')
        });  
    } 

    ngOnInit(): void {      
      this.titleService.setTitle(this.translate('title-set-password'));

      this.email = this.router.parseUrl(this.router.url).queryParams['email'];
      this.resetToken = this.router.parseUrl(this.router.url).queryParams['token'];
      
      if(!this.resetToken || !this.email) {
        this.alertService.show(this.translate('account-set-password-invalid-request'), 'Error');
      }
    }

    onSubmit(): void {
      if (this.form.valid && this.email && this.resetToken) {
        const { password } = this.form.value;
  
        this.authService.setPassword(this.email!, password, this.resetToken!).subscribe({
          next: () => {
            this.router.navigate(['/']);
            this.alertService.show(this.translate('account-set-password-success'), 'Success');
          }
        });
      }
    }
}
