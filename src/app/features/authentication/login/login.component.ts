import {Component} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait, we are logging you in'

  credentials = {
    email: '',
    password: '',
  }

  constructor(public authService: AngularFireAuth) {
    console.log(this.authService)
  }

  async login() {
    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait, we are logging you in'

    try {
      await this.authService.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password,
      )
    } catch (e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'An unexpected error occurred. Please try again later.'
      return
    }
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success! You are now logged in!'
  }

  labelClass(control: string): string {
    return control && '-top-3 left-2 text-sm opacity-100 bg-secondary'
  }
}
