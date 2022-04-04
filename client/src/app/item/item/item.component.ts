import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { NodeService } from 'src/app/node/node.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/item/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: Item;
  itemHistory: any[] = [];
  isLoading: boolean;
  displayAddDialog: boolean;

  constructor(
    private readonly itemService: ItemService,
    private readonly nodeService: NodeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
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
        this.itemHistory = result?.data?.inventoryHistoryByItem;
        this.itemHistory = [...this.itemHistory];
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
}
