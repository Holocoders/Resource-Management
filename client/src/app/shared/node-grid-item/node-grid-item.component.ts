import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemService } from '../../item/item.service';
import { CategoryService } from '../../category/category.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-node-grid-item',
  templateUrl: './node-grid-item.component.html',
  styleUrls: ['./node-grid-item.component.scss'],
})
export class NodeGridItemComponent {
  @Output() onDeleteClick = new EventEmitter();
  @Input() obj: any;
  @Output() objChange = new EventEmitter();
  displayAddDialog: boolean;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
  ) {}

  closeDialogItem(event: any, obj: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
    }
    event.data._id = obj.node._id;
    this.itemService
      .updateItem(event.data, event.file)
      .subscribe((res: any) => {
        obj = { ...obj, ...res.data.updateItem };
        this.objChange.emit(obj);
        this.displayAddDialog = false;
      });
  }

  onNodeDelete(event: any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteClick.emit(id);
      },
    });
  }

  closeDialogCategory(event: any, obj: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
    }
    event.data._id = obj.node._id;
    this.categoryService
      .updateCategory(event.data, event.file)
      .subscribe((res: any) => {
        obj = { ...obj, ...res.data.updateCategory };
        obj = JSON.parse(JSON.stringify(obj));
        this.objChange.emit(obj);
        this.displayAddDialog = false;
      });
  }
}
