import {Injectable} from '@angular/core'
import {modal} from 'src/app/core/enums/enum-modal'

interface IModal {
  id: string
  visible: boolean
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = []

  constructor() {}

  register(id: modal) {
    const existingModal = this.modals.find(modal => modal.id === id)
    if (existingModal) return

    this.modals.push({id, visible: false})
  }

  unregister(id: modal) {
    this.modals = this.modals.filter(modal => modal.id !== id)
  }

  toggle(id: modal) {
    const modal = this.modals.find(modal => modal.id === id)

    if (modal) modal.visible = !modal?.visible
  }

  isModalOpen(id: modal) {
    return !!this.modals.find(modal => modal.id === id)?.visible
  }
}
