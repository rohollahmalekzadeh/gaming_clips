import {Component, OnInit} from '@angular/core'
import {ModalService} from '../../services/modal/modal.service'

import {modal} from '../../enums/enum-modal'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  modal = modal
  constructor(public modalService: ModalService) {}

  openModal($event: Event) {
    $event.preventDefault()

    this.modalService.toggle(modal.AUTH)
  }
}
