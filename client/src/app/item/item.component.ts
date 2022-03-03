import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from './item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { ConfirmationService, Message } from 'primeng/api';
import { NodeService } from '../node/node.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: Item;
  inventoryHistory: any[] = [];
  isLoading: boolean;
  displayAddDialog: boolean;

  constructor(
    private readonly itemService: ItemService,
    private readonly nodeService: NodeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params.id),
        mergeMap((id) => this.itemService.getItemDetails(id)),
        mergeMap((result: any) => {
          this.item = result?.data?.item;
          return this.itemService.inventoryHistoryByItem(this.item.node._id);
        }),
      )
      .subscribe((result: any) => {
        this.isLoading = result.loading;
        this.inventoryHistory = result?.data?.inventoryHistoryByItem;
        this.inventoryHistory = [...this.inventoryHistory];
      });
  }

  closeDialogItem(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
    }
    event.data._id = this.item.node._id;
    this.itemService
      .updateItem(event.data, event.file)
      .subscribe((res: any) => {
        this.item = { ...this.item, ...res.data.updateItem };
        this.displayAddDialog = false;
      });
  }

  deleteItem(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nodeService
          .removeNode(this.item.node._id)
          .subscribe((res: any) => {
            this.router.navigate(['/node'], {
              queryParams: {
                id: this.item.node.parent._id,
              },
            });
          });
      },
    });
  }

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }
}
