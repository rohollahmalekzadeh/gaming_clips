import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router,
} from '@angular/router'

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore'
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {AngularFireStorage} from '@angular/fire/compat/storage'

import IClip from '../../models/clip.model'
import {switchMap, map} from 'rxjs/operators'
import {of, combineLatest, BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ClipService implements Resolve<IClip | null> {
  private clipsCollection: AngularFirestoreCollection<IClip>
  pageClips: IClip[] = []
  private pendingReq = false

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router,
  ) {
    this.clipsCollection = this.db.collection('clips')
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(data)
  }

  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([this.auth.user, sort$]).pipe(
      switchMap(values => {
        const [user, sort] = values

        if (!user) return of({})

        const query = this.clipsCollection.ref
          .where('uid', '==', user.uid)
          .orderBy('timestamp', sort == '1' ? 'desc' : 'asc')

        return query.get()
      }),
      map(snapshots => (snapshots as QuerySnapshot<IClip>).docs),
    )
  }

  async updateClip(id: string, title: string) {
    this.clipsCollection.doc(id).update({
      title,
    })
  }

  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`)
    const screenshotRef = this.storage.ref(
      `screenshots/${clip.screenshotFileName}`,
    )

    clipRef.delete()
    screenshotRef.delete()
    await this.clipsCollection.doc(clip.docId).delete()
  }

  async getClips() {
    if (this.pendingReq) return

    try {
      this.pendingReq = true
      let query = this.clipsCollection.ref.orderBy('timestamp', 'desc').limit(6)
      const {length} = this.pageClips

      if (length) {
        const lastDocId = this.pageClips[length - 1].docId

        const lastDoc = await this.clipsCollection
          .doc(lastDocId)
          .get()
          .toPromise()

        query = query.startAfter(lastDoc)
      }

      const snapshot = await query.get()

      snapshot.forEach(doc => {
        this.pageClips.push({
          docId: doc.id,
          ...doc.data(),
        })
      })

      this.pendingReq = false
    } catch (e) {
      this.pendingReq = false
    }
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.clipsCollection
      .doc(route.params['id'])
      .get()
      .pipe(
        map(snapshot => {
          const data = snapshot.data()
          if (!data) {
            this.router.navigate(['/'])
            return null
          }

          return data
        }),
      )
  }
}
