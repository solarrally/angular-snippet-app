import { FormGroup } from '@angular/forms';

export function matchingValuesValidatorFn(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['matchingRequired']) {
        matchingControl.setErrors(null);
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ matchingRequired: true });
      } 
      else {
        matchingControl.setErrors(null);
      }
    };
  }