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
  recentItems: any[] = [];
  isLoading: boolean;
  displayAddDialog: boolean;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

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
        this.itemHistory = result?.data?.inventoryHistoryByItem;
        this.itemHistory = [...this.itemHistory];
        this.itemService
          .itemHistoryByItem(this.item.node._id)
          .subscribe((result: any) => {
            this.isLoading = result.loading;
            this.itemHistory = [
              ...this.itemHistory,
              ...result.data.itemHistoryByItem,
            ];
          });
      });
    this.route.queryParams.pipe(map((params) => params.id)).subscribe((id) => {
      this.itemService.getRecentlyBoughtItems(id).subscribe((result: any) => {
        this.recentItems = [...result?.data?.relatedItems];
      });
    });
  }

  onRecentItemClick(id: string) {
    this.router.navigate(['/item'], { queryParams: { id } });
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
