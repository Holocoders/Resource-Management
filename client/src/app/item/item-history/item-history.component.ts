import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.scss'],
})
export class ItemHistoryComponent {
  @Input() itemHistory: any;

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }
}
