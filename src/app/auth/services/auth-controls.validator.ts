import { Injectable, } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class AuthControlsValidator {

    passwordStrengthValidator(control: AbstractControl) {
        const value = control.value || '';
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasMinLength = value.length >= 8;

        if (hasUpperCase && hasLowerCase && hasNumber && hasMinLength) {
            return null;
        } else {
            return { passwordStrength: 'error-password-stringht' };
        }
    }
}