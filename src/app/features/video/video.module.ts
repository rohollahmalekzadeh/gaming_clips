import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {VideoRoutingModule} from './video-routing.module'
import {SharedModule} from 'src/app/shared/shared.module'
import {UploadComponent} from './upload/upload.component'
import {ManageComponent} from './manage/manage.component'

@NgModule({
  declarations: [UploadComponent, ManageComponent],
  imports: [CommonModule, SharedModule, VideoRoutingModule],
  exports: [],
})
export class VideoModule {}
