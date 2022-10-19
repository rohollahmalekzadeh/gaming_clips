import {
  Component,
  AfterContentInit,
  ContentChildren,
  QueryList,
} from '@angular/core'
import {TabComponent} from '../tab/tab.component'

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs = new QueryList<TabComponent>()

  constructor() {}

  ngAfterContentInit(): void {
    const activeTab = this.tabs.filter(tab => tab.active)

    if (!activeTab || activeTab.length === 0) this.tabs.first.active = true
  }

  selectTab(selectedTab: TabComponent) {
    this.tabs.forEach(tab => (tab.active = false))

    selectedTab.active = true
    return false
  }
}
