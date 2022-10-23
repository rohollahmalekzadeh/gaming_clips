import {Component, OnInit, OnDestroy} from '@angular/core'
import {ModalService} from '../../services/modal/modal.service'
import {AuthService} from '../../services/authentication/auth.service'

import {modal} from '../../enums/enum-modal'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  modal = modal
  opacity = false
  constructor(
    public modalService: ModalService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll)
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }

  openModal($event: Event) {
    $event.preventDefault()

    this.modalService.toggle(modal.AUTH)
  }

  logout($event: Event) {
    this.authService.logout($event)
  }

  handleScroll = () => {
    const {scrollTop} = document.documentElement

    this.opacity = scrollTop > 100 ? true : false
  }
}
