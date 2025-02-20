import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserProfilesService } from '../../../services/user-profile/user-profiles.service';
import { UserProfileModel } from '../../../models/users/user-profile.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent extends BaseComponent implements OnInit {

  profileData: UserProfileModel | null = null;
  form: FormGroup;
  selectedLanguage: string = this.translateService.currentLang;

  constructor(
    translateService: TranslateService,
    private authService: AuthService,
    private userProfilesService: UserProfilesService,
    private formBuilder: FormBuilder,
    private router: Router) {
    super(translateService);
    this.form = this.formBuilder.group({
      pattern: '',
    });
  }

  ngOnInit(): void {
    this.userProfilesService.get().subscribe((response) => {
      this.profileData = response.data;
    });
  }

  onClickLogOut(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onSearchSubmit(): void {
    const pattern = this.form.get('pattern')?.value;
    let queryParams = {};
    if (pattern != null && pattern!.length > 0) {
      queryParams = { pattern: pattern };
    }

    this.router.navigate(
      ['/snippets'],
      { queryParams: queryParams });
  }

  switchLanguage(languageCode: string) {
    this.translateService.use(languageCode);
  }
}
