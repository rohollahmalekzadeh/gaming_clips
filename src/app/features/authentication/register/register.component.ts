import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import IUser from 'src/app/core/models/user.model'

import {RegisterValidators} from '../validators/register-validators'
import {EmailTaken} from '../validators/email-taken'

import {AuthService} from 'src/app/core/services/authentication/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Your account is being created.'

  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTakenValidator.validate],
  )
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$!%*?&]{8,}$/,
    ),
  ])
  confirmPassword = new FormControl('', [Validators.required])
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ])

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
      age: this.age,
    },
    [RegisterValidators.match('password', 'confirmPassword')],
  )

  constructor(
    private authService: AuthService,
    private emailTakenValidator: EmailTaken,
  ) {}

  async register() {
    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Your account is being created.'

    try {
      this.authService.createUser(this.registerForm.value as IUser)
    } catch (e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'An unexpected error occurred. Please try again later.'
      return
    }

    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success! Your account has been created.'
  }

  labelClass(control: FormControl): string {
    return control.value && '-top-3 left-2 text-sm opacity-100 bg-secondary'
  }
}
