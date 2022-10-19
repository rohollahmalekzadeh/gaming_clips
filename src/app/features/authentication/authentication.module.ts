import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SharedModule} from 'src/app/shared/shared.module'

import {ReactiveFormsModule, FormsModule} from '@angular/forms'

import {AuthModalComponent} from './auth-modal/auth-modal.component'
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'

@NgModule({
  declarations: [AuthModalComponent, RegisterComponent, LoginComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, FormsModule],
  exports: [AuthModalComponent, RegisterComponent, LoginComponent],
})
export class AuthenticationModule {}
