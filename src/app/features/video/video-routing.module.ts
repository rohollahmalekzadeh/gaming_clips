import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard'

import {UploadComponent} from './upload/upload.component'
import {ManageComponent} from './manage/manage.component'

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/')

const routes: Routes = [
  {
    path: 'upload',
    component: UploadComponent,
    data: {authOnly: true, authGuardPipe: redirectUnauthorizedToHome},
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'manage',
    component: ManageComponent,
    data: {authOnly: true, authGuardPipe: redirectUnauthorizedToHome},
    canActivate: [AngularFireAuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
