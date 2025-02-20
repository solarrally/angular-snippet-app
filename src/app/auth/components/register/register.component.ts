import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthControlsValidator } from '../../services/auth-controls.validator';
import { matchingValuesValidatorFn } from '../../services/auth-forms.validator';
import { AlertService } from '../../../services/common/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './register.component.html'
})

export class RegisterComponent extends BaseComponent implements OnInit {
  form: FormGroup;

  constructor(
    translateService: TranslateService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authControlsValidator: AuthControlsValidator,
    private titleService: Title,
    private alertService: AlertService,
    private router: Router) {
    super(translateService);

    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, authControlsValidator.passwordStrengthValidator]],
        confirmPassword: ['', [Validators.required, authControlsValidator.passwordStrengthValidator]],
        hasAgreedToTerms: [false, [Validators.requiredTrue]]
      },
      {
        validators: matchingValuesValidatorFn('password', 'confirmPassword')
      });
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate('title-sign-up'));
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { firstName, lastName, email, password } = this.form.value;

      this.authService.register(email, firstName, lastName, password).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.alertService.show(this.translate('account-register-success'), 'Success');
        }
      });
    }
  }
}
