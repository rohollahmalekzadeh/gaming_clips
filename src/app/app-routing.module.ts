import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AboutUsComponent} from './features/about-us/about-us.component'
import {HomeComponent} from './features/home/home.component'
import {NotFoundComponent} from './features/not-found/not-found.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutUsComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
