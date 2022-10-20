import {Injectable} from '@angular/core'
import {ValidationErrors, AsyncValidator, AbstractControl} from '@angular/forms'

import {Observable} from 'rxjs'
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({providedIn: 'root'})
export class EmailTaken implements AsyncValidator {
  constructor(private auth: AngularFireAuth) {}
  validate(
    control: AbstractControl<any, any>,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.auth
      .fetchSignInMethodsForEmail(control.value)
      .then(response => (response.length ? {emailTaken: true} : null))
  }
}
