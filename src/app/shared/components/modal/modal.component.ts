import {Component, OnInit, ElementRef, OnDestroy, Input} from '@angular/core'

import {ModalService} from 'src/app/core/services/modal/modal.service'
import {modal} from 'src/app/core/enums/enum-modal'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId: modal | null = null
  constructor(public modalService: ModalService, public element: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement)
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.element.nativeElement)
    this.modalService.unregister(modal.AUTH)
  }

  closeModal() {
    if (this.modalId) this.modalService.toggle(this.modalId)
  }
}
