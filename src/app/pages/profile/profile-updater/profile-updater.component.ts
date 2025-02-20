import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserProfileModel } from '../../../models/users/user-profile.model';
import { UserProfilesService } from '../../../services/user-profile/user-profiles.service';
import { AlertService } from '../../../services/common/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../components/base-component/base.component';

@Component({
  selector: 'profile-updater',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './profile-updater.component.html'
})

export class ProfileUpdaterComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  profileData: UserProfileModel | null = null;
  selectedFile: File|null = null;

  constructor(
    translateService: TranslateService,
    private userProfilesService: UserProfilesService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router) {
    super(translateService);

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      imageFile: [null]
    });
  }

  ngOnInit(): void {    
    this.userProfilesService.get().subscribe((response) => {
      this.profileData = response.data;
      this._initializeForm(response.data);
    });
  }

  onSubmit() : void {
    if (this.form.valid) {
      const { firstName, lastName } = this.form.value;

      const formData = new FormData();

      if(this.selectedFile) {
        formData.append('imageFile', this.selectedFile as Blob, this.selectedFile?.name);
      }

      formData.append('firstName', firstName);
      formData.append('lastName', lastName);

      this.userProfilesService.update(formData).subscribe({
        next: (response) => {
          this.alertService.show(this.translate('profile-update-success'), 'Success');
          this.profileData = response.data as UserProfileModel;
          this._clearSelectedFile();
        }
      });
    }
  }

  onCancel() : void {
    this.form.reset(this.profileData);
    this._clearSelectedFile();
  }

  onClearSelectedImage() : void {
    this._clearSelectedFile();
    this.form.get('imageFile')?.setValue(null);
  }

  onResetImageToDefault() : void {
    this.userProfilesService.resetImage().subscribe({
      next: (response) => {
        this.alertService.show(this.translate('profile-update-image-success'), 'Success');
        this.profileData = response.data as UserProfileModel;
        this._clearSelectedFile();
      }
    });
  }

  onFileSelected(event: any) : void {
    if(event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
     }
   }
   
  private _initializeForm(data: UserProfileModel|null) : void {
    if(data) {
      this.form.patchValue({
        firstName: data.firstName,
        lastName: data.lastName
      });
    }
  }

   private _clearSelectedFile() : void {
    this.selectedFile = null;
   }
}