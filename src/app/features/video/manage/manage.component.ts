import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router, Params} from '@angular/router'

import {BehaviorSubject} from 'rxjs'
import {modal} from 'src/app/core/enums/enum-modal'
import IClip from 'src/app/core/models/clip.model'

import {ClipService} from 'src/app/core/services/clip/clip.service'
import {ModalService} from 'src/app/core/services/modal/modal.service'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1'
  sort$: BehaviorSubject<string>
  activeClip: IClip | null = null
  clips: IClip[] = []

  constructor(
    private modalService: ModalService,
    private clipService: ClipService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder)
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(({params}: Params) => {
      this.videoOrder = params['sort'] === '2' ? '2' : '1'
      this.sort$.next(this.videoOrder)
    })

    this.clipService.getUserClips(this.sort$).subscribe(docs => {
      this.clips = []

      for (let doc of docs) this.clips.push({docId: doc.id, ...doc.data()})
    })
  }

  sort($event: Event) {
    const {value} = $event.target as HTMLSelectElement

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sort: value,
      },
    })

    this.clipService.getUserClips(this.sort$).subscribe(docs => {
      this.clips = []
      for (let doc of docs) this.clips.push({docId: doc.id, ...doc.data()})
    })
  }

  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault()

    this.clipService.deleteClip(clip)
    this.clips.forEach((innerClip, index) => {
      if (innerClip.docId === clip.docId) this.clips.splice(index, 1)
    })
  }

  async copyToClipboard($event: MouseEvent, docId: string | undefined) {
    $event.preventDefault()

    if (!docId) return

    const url = `${location.origin}/clip/${docId}`
    await navigator.clipboard.writeText(url)

    alert('link copied')
  }

  openModal($event: Event, clip: IClip) {
    $event.preventDefault()
    this.activeClip = clip

    this.modalService.toggle(modal.EDIT_CLIP)
  }

  update(clip: IClip) {
    this.clips.forEach((innerClip, index) => {
      if (innerClip.docId === clip.docId) this.clips[index].title = clip.title
    })
  }
}
