import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from './item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: Item;
  inventoryHistory: any[] = [];
  isLoading: boolean;

  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params.id),
        mergeMap((id) => this.itemService.getItemDetails(id)),
        mergeMap((result: any) => {
          this.item = result?.data?.item;
          return this.itemService.inventoryHistoryByItem(this.item.node._id);
        })
      )
      .subscribe((result: any) => {
        this.isLoading = result.loading;
        this.inventoryHistory = result?.data?.inventoryHistoryByItem;
        this.inventoryHistory = [...this.inventoryHistory];
      });
  }

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }
}
