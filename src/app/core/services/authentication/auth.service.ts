import {Injectable} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router'

import {map, delay, filter, switchMap} from 'rxjs/operators'
import {Observable, of} from 'rxjs'

import IUser from '../../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  private redirect = false

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userCollection = db.collection('user')

    this.isAuthenticated$ = auth.user.pipe(map(user => !!user))

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(700))

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => this.activatedRoute.firstChild),
        switchMap(route => route?.data ?? of({})),
      )
      .subscribe(data => {
        this.redirect = data['authOnly'] ?? false
      })
  }

  public async createUser(userData: IUser) {
    if (!userData.password) throw new Error('Password not provided')

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password,
    )

    if (!userCred.user) throw new Error('User cant be found!')

    await this.userCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })

    await userCred.user.updateProfile({
      displayName: userData.name,
    })
  }

  public async logout($event?: Event) {
    if ($event) $event.preventDefault()

    await this.auth.signOut()

    if (this.redirect) this.router.navigateByUrl('/')
  }
}
