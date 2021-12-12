import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { Item } from '../../models/item.model';
import { Facility } from '../../models/facility.model';

@Component({
  selector: 'app-node-grid-item',
  templateUrl: './node-grid-item.component.html',
  styleUrls: ['./node-grid-item.component.scss'],
})
export class NodeGridItemComponent implements OnInit {
  @Output() onDeleteClick = new EventEmitter();
  @Input() obj: Facility | Category | Item;

  constructor() {
  }

  ngOnInit(): void {
  }
}
