import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import {ModalComponent} from './components/modal/modal.component'
import {InputComponent} from './components/input/input.component'
import {AlertComponent} from './components/alert/alert.component'
import {TabsContainerComponent} from './components/tabs-container/tabs-container.component'
import {TabComponent} from './components/tab/tab.component'
import {EventBlockDirective} from './directives/event-block/event-block.directive'
import {SafeUrlPipe} from './pipes/safe-url/safe-url.pipe'
import {ClipListComponent} from './components/clip-list/clip-list.component'
import {FbTimestampPipe} from './pipes/fbTimestamp/fb-timestamp.pipe'

@NgModule({
  declarations: [
    ModalComponent,
    InputComponent,
    AlertComponent,
    TabComponent,
    TabsContainerComponent,
    EventBlockDirective,
    SafeUrlPipe,
    ClipListComponent,
    FbTimestampPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    SafeUrlPipe,
    TabComponent,
    ModalComponent,
    InputComponent,
    AlertComponent,
    FbTimestampPipe,
    ClipListComponent,
    EventBlockDirective,
    TabsContainerComponent,
  ],
})
export class SharedModule {}
