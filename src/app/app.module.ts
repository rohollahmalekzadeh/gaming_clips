import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireAuthModule} from '@angular/fire/compat/auth'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import {environment} from 'src/environments/environment'

import {SharedModule} from './shared/shared.module'
import {CoreModule} from './core/core.module'
import {AuthenticationModule} from './features/authentication/authentication.module'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {AboutUsComponent} from './features/about-us/about-us.component'
import {NotFoundComponent} from './features/not-found/not-found.component'
import {HomeComponent} from './features/home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AuthenticationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
