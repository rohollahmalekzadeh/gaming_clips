import {ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'

export class RegisterValidators {
  public static match(
    controlName: string,
    matchingControlName: string,
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName)
      const controlMatching = group.get(matchingControlName)

      if (!control || !controlMatching) return {controlNotFound: true}

      const error =
        control.value !== controlMatching.value ? {noMatch: true} : null

      return error
    }
  }
}
