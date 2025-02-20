import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  isVisible: boolean = false;
  platformId: object;

  constructor(
    translateService: TranslateService,
    private readonly formBuilder: FormBuilder, 
    private readonly authService: AuthService, 
    private readonly titleService: Title,
    private readonly router: Router) {    
      super(translateService);

      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });

    this.platformId = inject(PLATFORM_ID);
  }  

  ngOnInit() {   
    this._handleComponentLoading();    
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/'])
        }
      });
    }
  }


  _handleComponentLoading(): void {   
    this.isVisible = isPlatformBrowser(this.platformId);
    
    if(this.isVisible) {
      this.titleService.setTitle(this.translate('title-sign-in'));
      this.authService.logout();
    }
  }
}
