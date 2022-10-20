import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'

import {NavbarComponent} from '../core/components/navbar/navbar.component'

import {SharedModule} from '../shared/shared.module'
import {AuthenticationModule} from '../features/authentication/authentication.module'

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, SharedModule, RouterModule, AuthenticationModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
