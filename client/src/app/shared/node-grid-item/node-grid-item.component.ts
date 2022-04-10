import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemService } from '../../item/item.service';
import { CategoryService } from '../../category/category.service';
import { ConfirmationService } from 'primeng/api';
import { NodeType } from 'src/app/models/node.model';

@Component({
  selector: 'app-node-grid-item',
  templateUrl: './node-grid-item.component.html',
  styleUrls: ['./node-grid-item.component.scss'],
})
export class NodeGridItemComponent {
  @Output() onDeleteClick = new EventEmitter();
  @Input() obj: any;
  @Input() editable: boolean;
  @Output() objChange = new EventEmitter();
  displayAddDialog: boolean;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
  ) {}

  getHeaderColor(type: NodeType) {
    if (type === NodeType.ITEM) {
      return 'bg-blue-200';
    } else if (type === NodeType.PACK) {
      return 'bg-pink-200';
    }
    return 'bg-green-200';
  }

  closeDialogItem(event: any, obj: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
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

  closeDialogPack(event: any, obj: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
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

  onNodeDelete(event: any, obj: any) {
    const id = obj?.node?._id;
    this.confirmationService.confirm({
      target: event.target,
      message: `Are you sure that you want to delete this ${obj?.node?.type.toLowerCase()}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteClick.emit(id);
      },
      reject: () => {
        this.confirmationService.close();
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
