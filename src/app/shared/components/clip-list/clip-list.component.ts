import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {ClipService} from 'src/app/core/services/clip/clip.service'

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css'],
})
export class ClipListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true
  constructor(public clipService: ClipService) {
    this.clipService.getClips()
  }

  ngOnInit(): void {
    if (this.scrollable) window.addEventListener('scroll', this.handleScroll)
  }

  ngOnDestroy(): void {
    if (this.scrollable) window.removeEventListener('scroll', this.handleScroll)

    this.clipService.pageClips = []
  }

  handleScroll = async () => {
    const {scrollTop, offsetHeight} = document.documentElement
    const {innerHeight} = window

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight
    if (bottomOfWindow) await this.clipService.getClips()
  }
}
