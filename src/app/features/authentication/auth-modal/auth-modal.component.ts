import {Component, OnDestroy, OnInit} from '@angular/core'
import {ModalService} from 'src/app/core/services/modal/modal.service'
import {modal} from 'src/app/core/enums/enum-modal'

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  modal = modal
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.register(modal.AUTH)
  }

  ngOnDestroy(): void {
    this.modalService.unregister(modal.AUTH)
  }

  closeModal() {
    this.modalService.toggle(modal.AUTH)
  }
}
