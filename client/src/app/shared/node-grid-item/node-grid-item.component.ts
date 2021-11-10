import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-node-grid-item',
  templateUrl: './node-grid-item.component.html',
  styleUrls: ['./node-grid-item.component.scss'],
})
export class NodeGridItemComponent implements OnInit {
  @Output() onDeleteClick = new EventEmitter();
  @Input() obj: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
