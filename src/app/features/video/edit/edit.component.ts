import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core'

import {modal} from 'src/app/core/enums/enum-modal'
import IClip from 'src/app/core/models/clip.model'
import {ModalService} from 'src/app/core/services/modal/modal.service'

import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ClipService} from 'src/app/core/services/clip/clip.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() clip: IClip | null = null
  @Output() update = new EventEmitter()

  modal = modal

  clipId = new FormControl('', {nonNullable: true})
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  })
  editForm = new FormGroup({clipId: this.clipId, title: this.title})

  inSubmission = false
  alertColor = 'blue'
  showAlert = false
  alertMsg = 'Please wait! Updating clip.'

  constructor(
    private modalService: ModalService,
    private clipService: ClipService,
  ) {}

  ngOnInit(): void {
    this.modalService.register(modal.EDIT_CLIP)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.clip) return

    this.inSubmission = false
    this.showAlert = false

    this.clipId.setValue(this.clip.docId as string)
    this.title.setValue(this.clip.title)
  }

  ngOnDestroy(): void {
    this.modalService.unregister(modal.EDIT_CLIP)
  }

  async submit() {
    this.inSubmission = false
    this.alertColor = 'blue'
    this.showAlert = true
    this.alertMsg = 'Please wait! Updating clip.'

    if (!this.clip) return
    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value)
    } catch (error) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Please wait! Updating clip.'
    }
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Please wait! Updating clip.'

    this.clip.title = this.title.value
    this.update.emit(this.clip)
  }
}
