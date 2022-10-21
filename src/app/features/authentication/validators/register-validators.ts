import {ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'

export class RegisterValidators {
  public static match(
    controlName: string,
    matchingControlName: string,
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName)
      const matchingControl = group.get(matchingControlName)

      if (!control || !matchingControl) return {controlNotFound: true}

      const error =
        control.value !== matchingControl.value ? {noMatch: true} : null
      matchingControl.setErrors(error)

      return error
    }
  }
}
