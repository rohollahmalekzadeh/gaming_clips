import {Component, OnDestroy} from '@angular/core'
import {Router} from '@angular/router'
import {FormControl, FormGroup, Validators} from '@angular/forms'

import {ClipService} from 'src/app/core/services/clip/clip.service'
import {FfmpegService} from 'src/app/core/services/ffmpeg/ffmpeg.service'
import IClip from 'src/app/core/models/clip.model'
import {v4 as uuid} from 'uuid'

import {switchMap} from 'rxjs/operators'
import {combineLatest, forkJoin} from 'rxjs'

import {AngularFireAuth} from '@angular/fire/compat/auth'
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage'
import firebase from 'firebase/compat/app'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnDestroy {
  user: firebase.User | null = null

  isDragover = false
  nextStep = false

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  })
  uploadForm = new FormGroup({title: this.title})
  file: File | null = null

  alertColor = 'blue'
  alertMsg = 'Please wait! Your clip is being uploaded.'
  showAlert = false
  percentage = 0
  showPercentage = false
  inSubmission = false

  task?: AngularFireUploadTask
  screenshotTask?: AngularFireUploadTask

  screenshots: string[] = []
  selectedScreenshot = ''

  constructor(
    private clipService: ClipService,
    public ffmpeg: FfmpegService,
    private router: Router,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
  ) {
    this.auth.user.subscribe(user => (this.user = user))
    this.ffmpeg.init()
  }

  ngOnDestroy(): void {
    this.task?.cancel()
  }

  async storeFile($event: Event) {
    if (this.ffmpeg.isRunning) return

    this.isDragover = false

    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4') return

    this.screenshots = await this.ffmpeg.getScreenshots(this.file)
    this.selectedScreenshot = this.screenshots[0]

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''))
    this.nextStep = true
  }

  async uploadFile() {
    this.uploadForm.disable()

    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Your clip is being uploaded.'
    this.showAlert = true
    this.percentage = 0
    this.showPercentage = true
    this.inSubmission = true

    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath)

    const screenshotBlob = await this.ffmpeg.blobFormURL(
      this.selectedScreenshot,
    )
    const screenshotPath = `screenshots/${clipFileName}.png`
    this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob)
    const screenshotRef = this.storage.ref(screenshotPath)

    combineLatest([
      this.task.percentageChanges(),
      this.screenshotTask.percentageChanges(),
    ]).subscribe(progress => {
      const [clipProgress, screenshotProgress] = progress

      if (!clipProgress || !screenshotProgress) return

      const total = clipProgress + screenshotProgress
      this.percentage = (total as number) / 200
    })

    forkJoin([
      this.task.snapshotChanges(),
      this.screenshotTask.snapshotChanges(),
    ])
      .pipe(
        switchMap(() =>
          forkJoin([clipRef.getDownloadURL(), screenshotRef.getDownloadURL()]),
        ),
      )
      .subscribe({
        next: async urls => {
          const [clipUrl, screenshotUrl] = urls

          const clip: IClip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value,
            url: clipUrl,
            screenshotURL: screenshotUrl,
            screenshotFileName: `${screenshotBlob}.png`,
            fileName: `${clipFileName}.mp4`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }

          const clipDocRef = await this.clipService.createClip(clip)

          this.alertColor = 'green'
          this.alertMsg =
            'Success! Your clip is now ready to share with the world.'
          this.showPercentage = false

          setTimeout(() => {
            this.router.navigate(['clip', clipDocRef.id])
          }, 400)
        },
        error: e => {
          this.uploadForm.enable()

          this.alertColor = 'red'
          this.alertMsg = 'Upload failed! Please try again later.'

          this.showPercentage = false
          this.inSubmission = false
        },
      })
  }
}
