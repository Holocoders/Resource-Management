import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-node-grid-item',
  templateUrl: './node-grid-item.component.html',
  styleUrls: ['./node-grid-item.component.scss'],
})
export class NodeGridItemComponent {
  @Output() onDeleteClick = new EventEmitter();
  @Input() obj: any;
}
