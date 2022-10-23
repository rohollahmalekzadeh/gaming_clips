import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'

import {VideoRoutingModule} from './video-routing.module'
import {SharedModule} from 'src/app/shared/shared.module'
import {UploadComponent} from './upload/upload.component'
import {ManageComponent} from './manage/manage.component'
import {EditComponent} from './edit/edit.component'
import {ClipComponent} from '../clip/clip.component'

@NgModule({
  declarations: [
    UploadComponent,
    ManageComponent,
    EditComponent,
    ClipComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class VideoModule {}
