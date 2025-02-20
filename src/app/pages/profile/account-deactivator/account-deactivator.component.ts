import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../services/common/alert.service';
import { UserProfilesService } from '../../../services/user-profile/user-profiles.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'account-deactivator',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './account-deactivator.component.html'
})

export class AccountDeactivatorComponent extends BaseComponent {
  form: FormGroup;

  constructor(
    translateService: TranslateService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userProfilesService: UserProfilesService,
    private router: Router) {
    super(translateService);
      
    this.form = this.formBuilder.group(
    {
      hasConfirmedDeactivation: [false, [Validators.requiredTrue]]
    });
  }

onSubmit() {
  if (this.form.valid) {
    this.userProfilesService.deactivate().subscribe({
      next: () => {
        this.alertService.show(this.translate('profile-deactivation-success'), 'Success');
        this.router.navigate(['/login']);
      }
    });
  }
}
}
