import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ClipService} from './core/services/clip/clip.service'

import {AboutUsComponent} from './features/about-us/about-us.component'
import {ClipComponent} from './features/clip/clip.component'
import {HomeComponent} from './features/home/home.component'
import {NotFoundComponent} from './features/not-found/not-found.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'clip/:id', component: ClipComponent, resolve: {clip: ClipService}},

  {
    path: '',
    loadChildren: async () =>
      (await import('./features/video/video.module')).VideoModule,
  },
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
